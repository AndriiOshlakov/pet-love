'use client';

import { useQuery } from '@tanstack/react-query';
import css from './Filters.module.css';
import { fetchCategories, fetchLocations, fetchSex, fetchSpecies } from '@/lib/api/serverApi';
import { NoticeRequestParams } from '@/types/Notice';
import { useState } from 'react';
import { useDebounce } from '@/hooks/DebounceHook';
import Select, { components, type StylesConfig } from 'react-select';

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <svg width="18" height="18">
        <use href="/symbol-defs.svg#search" />
      </svg>
    </components.DropdownIndicator>
  );
};

interface Props {
  filters: Partial<NoticeRequestParams>;
  onChangeFilters: (newFilters: Partial<NoticeRequestParams>) => void;
}

type LocationOption = {
  value: string;
  label: string;
};

export default function Filters({ filters, onChangeFilters }: Props) {
  const [selectedLocation, setSelectedLocation] = useState<LocationOption | null>(null);
  const [value, setValue] = useState('');
  const [activeRadio, setActiveRadio] = useState('');
  const [cheapRadio, setCheapRadio] = useState('');

  const [locationSearch, setLocationSearch] = useState('');
  const debouncedLocationSearch = useDebounce(locationSearch, 500);

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
  const { data: gender } = useQuery({
    queryKey: ['sex'],
    queryFn: fetchSex,
  });
  const { data: species } = useQuery({
    queryKey: ['species'],
    queryFn: fetchSpecies,
  });
  const { data: locationsFromBackend = [] } = useQuery({
    queryKey: ['locations', debouncedLocationSearch],
    queryFn: () => fetchLocations(debouncedLocationSearch),
    enabled: debouncedLocationSearch.length >= 3,
  });
  const locationOptions: LocationOption[] = locationsFromBackend.map(
    ({ _id, cityEn, countyEn, stateEn }) => ({
      value: _id,
      label: `${cityEn}, ${countyEn} district, ${stateEn} region`,
    }),
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onChangeFilters({ ...filters, keyword: value });
  };
  const defaultFilters: Partial<NoticeRequestParams> = {
    page: 1,
    limit: 6,
    byPopularity: null,
    byPrice: null,
    keyword: '',
    species: '',
    category: '',
    sex: '',
    locationId: '',
  };

  return (
    <div className={css.formBox}>
      <form onSubmit={handleSubmit}>
        <div className={css.box}>
          <label className={css.inputLabel}>
            <input
              name="search"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className={css.input}
              placeholder="Search"
            ></input>
            <button type="submit" className={css.submitBtn}>
              <svg width={18} height={18}>
                <use href="/symbol-defs.svg#search" />
              </svg>
            </button>
            {value && (
              <button
                onClick={() => {
                  onChangeFilters({ ...filters, keyword: '' });
                  setValue('');
                }}
                className={css.clearBtn}
              >
                <svg width={18} height={18}>
                  <use href="/symbol-defs.svg#x" />
                </svg>
              </button>
            )}
          </label>

          <label className={css.categoriesLabel}>
            <select
              className={css.categories}
              value={filters.category}
              name="categories"
              onChange={(e) =>
                onChangeFilters({
                  ...filters,
                  category: e.target.value as 'sell' | 'free' | 'lost' | 'found',
                  page: 1,
                })
              }
            >
              <option value="">Category</option>
              {categories &&
                categories.map((category) => (
                  <option key={category} value={category}>
                    {{ category }.category.charAt(0).toUpperCase() + { category }.category.slice(1)}
                  </option>
                ))}
            </select>
            <svg className={css.categoriesChevron} width={18} height={18}>
              <use href="/symbol-defs.svg#chevron-down" />
            </svg>
          </label>
          <label className={css.genderLabel}>
            <select
              value={filters.sex}
              className={css.gender}
              name="gender"
              onChange={(e) =>
                onChangeFilters({
                  ...filters,
                  sex: e.target.value as NoticeRequestParams['sex'],
                  page: 1,
                })
              }
            >
              <option value="">By gender</option>
              {gender &&
                gender.map((sex) => (
                  <option key={sex} value={sex}>
                    {{ sex }.sex.charAt(0).toUpperCase() + { sex }.sex.slice(1)}
                  </option>
                ))}
            </select>
            <svg className={css.genderChevron} width={18} height={18}>
              <use href="/symbol-defs.svg#chevron-down" />
            </svg>
          </label>
          <label className={css.speciesLabel}>
            <select
              className={css.species}
              value={filters.species}
              onChange={(e) =>
                onChangeFilters({
                  ...filters,
                  species: e.target.value as NoticeRequestParams['species'],
                  page: 1,
                })
              }
            >
              <option value="">By type</option>
              {species &&
                species.map((item) => (
                  <option key={item} value={item}>
                    {{ item }.item.charAt(0).toUpperCase() + { item }.item.slice(1)}
                  </option>
                ))}
            </select>
            <svg className={css.speciesChevron} width={18} height={18}>
              <use href="/symbol-defs.svg#chevron-down" />
            </svg>
          </label>

          <Select<LocationOption, false>
            instanceId="location-select"
            className={css.select}
            classNamePrefix="rs"
            placeholder="Location"
            isClearable
            options={locationOptions}
            value={selectedLocation}
            styles={selectStyles}
            components={{
              DropdownIndicator,
              IndicatorSeparator: () => null, // ❌ прибираємо роздільник
            }}
            onInputChange={(value, meta) => {
              if (meta.action === 'input-change') {
                setLocationSearch(value);
              }
            }}
            onChange={(option) => {
              setSelectedLocation(option);
              onChangeFilters({
                ...filters,
                locationId: option?.value,
                page: 1,
              });
            }}
          />
        </div>
        <div className={css.radios}>
          <label className={`${css.radio} ${activeRadio === 'popular' ? css.active : ''}`}>
            <input
              type="radio"
              name="sort"
              value="popular"
              checked={activeRadio === 'popular'}
              onChange={() => {
                (onChangeFilters({ ...filters, byPopularity: true }), setActiveRadio('popular'));
              }}
            />
            Popular
            {activeRadio === 'popular' && (
              <button
                className={css.btnDefault}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  onChangeFilters(defaultFilters);
                  setActiveRadio('');
                  setCheapRadio('');
                }}
              >
                <svg width={18} height={18}>
                  <use href="/symbol-defs.svg#x" />
                </svg>
              </button>
            )}
          </label>

          <label className={`${css.radio} ${activeRadio === 'unpopular' ? css.active : ''}`}>
            <input
              type="radio"
              name="sort"
              value="unpopular"
              checked={activeRadio === 'unpopular'}
              onChange={() => {
                (onChangeFilters({ ...filters, byPopularity: false }), setActiveRadio('unpopular'));
              }}
            />
            Unpopular
            {activeRadio === 'unpopular' && (
              <button
                className={css.btnDefault}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  onChangeFilters(defaultFilters);
                  setActiveRadio('');
                  setCheapRadio('');
                }}
              >
                <svg width={18} height={18}>
                  <use href="/symbol-defs.svg#x" />
                </svg>
              </button>
            )}
          </label>

          <label className={`${css.radio} ${cheapRadio === 'cheap' ? css.active : ''}`}>
            <input
              type="radio"
              name="cheap"
              value="cheap"
              checked={cheapRadio === 'cheap'}
              onChange={() => {
                (onChangeFilters({ ...filters, byPrice: false }), setCheapRadio('cheap'));
              }}
            />
            Cheap
            {cheapRadio === 'cheap' && (
              <button
                className={css.btnDefault}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  onChangeFilters(defaultFilters);
                  setActiveRadio('');
                  setCheapRadio('');
                }}
              >
                <svg width={18} height={18}>
                  <use href="/symbol-defs.svg#x" />
                </svg>
              </button>
            )}
          </label>
          <label className={`${css.radio} ${cheapRadio === 'expensive' ? css.active : ''}`}>
            <input
              type="radio"
              name="cheap"
              value="expensive"
              checked={cheapRadio === 'expensive'}
              onChange={() => {
                (onChangeFilters({ ...filters, byPrice: true }), setCheapRadio('expensive'));
              }}
            />
            Expensive
            {cheapRadio === 'expensive' && (
              <button
                className={css.btnDefault}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  onChangeFilters(defaultFilters);
                  setActiveRadio('');
                  setCheapRadio('');
                }}
              >
                <svg width={18} height={18}>
                  <use href="/symbol-defs.svg#x" />
                </svg>
              </button>
            )}
          </label>
        </div>
      </form>
    </div>
  );
}

const selectStyles: StylesConfig<LocationOption, false> = {
  control: (base) => ({
    ...base,
    minHeight: 44,
    borderRadius: 30,
    border: 'none',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#f6b83c',
    },
  }),

  placeholder: (base) => ({
    ...base,
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 1.3,
    color: 'black',
  }),

  valueContainer: (base) => ({
    ...base,
    paddingLeft: 12,
  }),

  dropdownIndicator: (base) => ({
    ...base,
    stroke: 'black',
    fill: 'white',
  }),

  indicatorsContainer: (base) => ({ ...base, paddingRight: 4 }),

  indicatorSeparator: () => ({
    display: 'none',
  }),
};
