import { memo, ReactNode, useState } from 'react';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { Card } from '../../../../shared/ui/Card/Card';
import { Heading } from '../../../../shared/ui/Heading/Heading';
import { Input } from '../../../../shared/ui/Input/Input';
import { Button, ButtonTheme } from '../../../../shared/ui/Button/Button';
import { Col, ColAlign, ColGapSize } from '../../../../shared/ui/Col/Col';
import { useCreateTourMutation } from '../../../../entities/tour/api/toursApi';
import { Row } from '../../../../shared/ui/Row/Row';
import DatePicker, {
  Day,
  utils
} from '@amir04lm26/react-modern-calendar-date-picker';
import '@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css';
import { useForm, Controller } from 'react-hook-form';
import { dateToYyyyMmDd } from '../../lib/mapDate';
import {
  useGetAllCountriesQuery,
  useGetCitiesByCountryIdQuery
} from '../../../../entities/countries/api/countriesApi';
import { City, Country } from '../../../../entities/countries/api/types';
import { Select } from '../../../../shared/ui/Select/Select';
import cls from './CreateNewTour.module.scss';
import { mapToCreateTourDto } from '../../lib/mapToCreateTourDto';

interface CreateNewTourProps {
  className?: string;
}

interface FormFieldProps {
  label: string;
  error?: string;
  children: ReactNode;
}

const FormField = ({ label, error, children }: FormFieldProps) => (
  <label className={cls.formField}>
    <span>{label}</span>
    {children}
    {error && <small>{error}</small>}
  </label>
);

type TourForm = Omit<
  Parameters<typeof mapToCreateTourDto>[0],
  'datesDeparture'
> & {
  datesDeparture: Day[];
};

const CreateNewTour = memo(({ className }: CreateNewTourProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState('');
  const [imageInputKey, setImageInputKey] = useState(0);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<TourForm>({
    defaultValues: {
      cityDeparture: '',
      cityArrival: '',
      countryDeparture: '',
      countryArrival: '',
      hotelId: '',
      nightsAmount: '',
      price: '',
      currency: '',
      guests: '',
      description: '',
      rating: '',
      datesDeparture: []
    }
  });

  const { data: countries = [] } = useGetAllCountriesQuery();
  const watchSelectedDepartureCountry = watch('countryDeparture');
  const { data: citiesDeparture = [] } = useGetCitiesByCountryIdQuery(
    watchSelectedDepartureCountry
  );
  const watchSelectedArrivalCountry = watch('countryArrival');
  const { data: citiesArrival = [] } = useGetCitiesByCountryIdQuery(
    watchSelectedArrivalCountry
  );

  const [createTour, result] = useCreateTourMutation();

  const onSubmit = async (data: TourForm) => {
    if (!image) {
      setImageError('Choose a JPEG image.');
      return;
    }
    const createTourDto = mapToCreateTourDto({
      ...data,
      datesDeparture: data.datesDeparture.map(dateToYyyyMmDd)
    });
    try {
      await createTour({ tour: createTourDto, image }).unwrap();
      reset();
      setImage(null);
      setImageError('');
      setImageInputKey((key) => key + 1);
    } catch {
      // Mutation state renders the API error below the form.
    }
  };

  const selectImage = (file: File | undefined) => {
    setImage(null);
    if (!file) {
      setImageError('Choose a JPEG image.');
      return;
    }
    if (file.type !== 'image/jpeg') {
      setImageError('The cover image must be a JPEG file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setImageError('The cover image must be 5 MB or smaller.');
      return;
    }
    setImage(file);
    setImageError('');
  };

  return (
    <Card className={classNames(cls.CreateNewTour, {}, [className ?? ''])}>
      <form
        onSubmit={(event) => {
          void handleSubmit(onSubmit)(event);
        }}
      >
        <Col
          gapSize={ColGapSize.XXL}
          align={ColAlign.CENTER}
        >
          <div className={cls.heading}>
            <Heading>Add a tour</Heading>
            <p>Complete the trip details and upload a JPEG cover image.</p>
          </div>
          <Row className={cls.createNewTourRow}>
            <Col
              gapSize={ColGapSize.XXL}
              align={ColAlign.CENTER}
            >
              <FormField
                label='Departure country'
                error={errors.countryDeparture?.message}
              >
                <Controller
                  name='countryDeparture'
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      aria-invalid={!!errors.countryDeparture}
                      options={countries.map((country: Country) => ({
                        value: country.id,
                        content: country.name
                      }))}
                      placeholder='Choose a country'
                      onChange={(value) => {
                        field.onChange(value);
                        setValue('cityDeparture', '');
                      }}
                    />
                  )}
                  rules={{ required: 'Choose a departure country.' }}
                />
              </FormField>
              {watchSelectedDepartureCountry && (
                <FormField
                  label='Departure city'
                  error={errors.cityDeparture?.message}
                >
                  <Controller
                    name='cityDeparture'
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        aria-invalid={!!errors.cityDeparture}
                        options={citiesDeparture.map((city: City) => ({
                          value: city.id,
                          content: city.name
                        }))}
                        placeholder='Choose a city'
                      />
                    )}
                    rules={{ required: 'Choose a departure city.' }}
                  />
                </FormField>
              )}
              <FormField
                label='Destination country'
                error={errors.countryArrival?.message}
              >
                <Controller
                  name='countryArrival'
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      aria-invalid={!!errors.countryArrival}
                      options={countries.map((country: Country) => ({
                        value: country.id,
                        content: country.name
                      }))}
                      placeholder='Choose a country'
                      onChange={(value) => {
                        field.onChange(value);
                        setValue('cityArrival', '');
                      }}
                    />
                  )}
                  rules={{ required: 'Choose a destination country.' }}
                />
              </FormField>
              {watchSelectedArrivalCountry && (
                <FormField
                  label='Destination city'
                  error={errors.cityArrival?.message}
                >
                  <Controller
                    name='cityArrival'
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        aria-invalid={!!errors.cityArrival}
                        options={citiesArrival.map((city: City) => ({
                          value: city.id,
                          content: city.name
                        }))}
                        placeholder='Choose a city'
                      />
                    )}
                    rules={{ required: 'Choose a destination city.' }}
                  />
                </FormField>
              )}
            </Col>
            <Col
              gapSize={ColGapSize.XXL}
              align={ColAlign.CENTER}
            >
              <FormField
                label='Hotel reference'
                error={errors.hotelId?.message}
              >
                <Controller
                  name='hotelId'
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder='e.g. AMS-204'
                      error={!!errors.hotelId}
                    />
                  )}
                  rules={{
                    required: 'Enter a hotel reference.',
                    maxLength: {
                      value: 255,
                      message: 'Use 255 characters or fewer.'
                    }
                  }}
                />
              </FormField>
              <FormField
                label='Number of nights'
                error={errors.nightsAmount?.message}
              >
                <Controller
                  name='nightsAmount'
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type='number'
                      min={1}
                      step={1}
                      placeholder='7'
                      error={!!errors.nightsAmount}
                    />
                  )}
                  rules={{
                    required: 'Enter the number of nights.',
                    min: { value: 1, message: 'Enter at least one night.' }
                  }}
                />
              </FormField>
              <FormField
                label='Departure dates'
                error={errors.datesDeparture?.message}
              >
                <Controller
                  name='datesDeparture'
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      inputPlaceholder='Choose dates'
                      minimumDate={utils('en').getToday()}
                      {...field}
                      inputClassName={classNames(cls.customInput, {}, [
                        errors.datesDeparture ? cls.customInputError : ''
                      ])}
                      shouldHighlightWeekends
                      calendarPopperPosition='bottom'
                    />
                  )}
                  rules={{ required: 'Choose at least one departure date.' }}
                />
              </FormField>
            </Col>
            <Col
              gapSize={ColGapSize.XXL}
              align={ColAlign.CENTER}
            >
              <FormField
                label='Total price'
                error={errors.price?.message}
              >
                <Controller
                  name='price'
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type='number'
                      min={0}
                      step={1}
                      placeholder='1200'
                      error={!!errors.price}
                    />
                  )}
                  rules={{
                    required: 'Enter the total price.',
                    min: { value: 0, message: 'Price cannot be negative.' }
                  }}
                />
              </FormField>
              <FormField
                label='Currency'
                error={errors.currency?.message}
              >
                <Controller
                  name='currency'
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      maxLength={3}
                      placeholder='EUR'
                      error={!!errors.currency}
                    />
                  )}
                  rules={{
                    required: 'Enter a currency code.',
                    pattern: {
                      value: /^[A-Za-z]{3}$/,
                      message: 'Use a three-letter code such as EUR.'
                    }
                  }}
                />
              </FormField>
              <FormField
                label='Guests included'
                error={errors.guests?.message}
              >
                <Controller
                  name='guests'
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type='number'
                      min={1}
                      step={1}
                      placeholder='2'
                      error={!!errors.guests}
                    />
                  )}
                  rules={{
                    required: 'Enter the number of guests.',
                    min: { value: 1, message: 'Include at least one guest.' }
                  }}
                />
              </FormField>
            </Col>
            <Col
              gapSize={ColGapSize.XXL}
              align={ColAlign.CENTER}
            >
              <FormField
                label='Short description'
                error={errors.description?.message}
              >
                <Controller
                  name='description'
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      maxLength={255}
                      placeholder='Describe the tour'
                      error={!!errors.description}
                    />
                  )}
                  rules={{
                    required: 'Enter a short description.',
                    maxLength: {
                      value: 255,
                      message: 'Use 255 characters or fewer.'
                    }
                  }}
                />
              </FormField>
              <label className={cls.fileField}>
                <span>Tour photo</span>
                <input
                  key={imageInputKey}
                  type='file'
                  accept='image/jpeg,.jpg,.jpeg'
                  required
                  aria-invalid={!!imageError}
                  onChange={(event) => selectImage(event.target.files?.[0])}
                />
                <small className={imageError ? cls.fieldError : undefined}>
                  {imageError || 'JPEG, up to 5 MB.'}
                </small>
              </label>
            </Col>
            <FormField
              label='Rating'
              error={errors.rating?.message}
            >
              <Controller
                name='rating'
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type='number'
                    min={0}
                    max={5}
                    step={1}
                    placeholder='0–5'
                    error={!!errors.rating}
                  />
                )}
                rules={{
                  required: 'Enter a rating.',
                  min: { value: 0, message: 'Rating cannot be below zero.' },
                  max: { value: 5, message: 'Rating cannot exceed five.' }
                }}
              />
            </FormField>
          </Row>
          {result.isError && (
            <p
              className={cls.error}
              role='alert'
            >
              Could not create the tour. An administrator login and valid tour
              details are required.
            </p>
          )}
          {result.isSuccess && (
            <p
              className={cls.success}
              role='status'
            >
              Tour created and added to the catalogue.
            </p>
          )}
          <Button
            theme={ButtonTheme.CONTAIN}
            type='submit'
            disabled={result.isLoading}
            fullwidth
          >
            {result.isLoading ? 'Publishing…' : 'Publish tour'}
          </Button>
        </Col>
      </form>
    </Card>
  );
});

CreateNewTour.displayName = 'CreateNewTour';

export { CreateNewTour };
