import { memo, useState } from 'react';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { Card } from '../../../../shared/ui/Card/Card';
import { Heading } from '../../../../shared/ui/Heading/Heading';
import { Input } from '../../../../shared/ui/Input/Input';
import { Button, ButtonSize, ButtonTheme } from '../../../../shared/ui/Button/Button';
import { Col, ColAlign, ColGapSize } from '../../../../shared/ui/Col/Col';
import { useCreateTourMutation } from '../../../../entities/tour/api/toursApi';
import { Row, RowGapSize } from '../../../../shared/ui/Row/Row';
import DatePicker, { Day, utils } from '@amir04lm26/react-modern-calendar-date-picker';
import '@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css';
import { useForm, Controller } from "react-hook-form";
import { dateToYyyyMmDd } from '../../lib/mapDate';
import { useGetAllCountriesQuery, useGetCitiesByCountryIdQuery } from '../../../../entities/countries/api/countriesApi';
import { City, Country } from '../../../../entities/countries/api/types';
import { Select } from '../../../../shared/ui/Select/Select';
import cls from './CreateNewTour.module.scss';
import { mapToCreateTourDto } from '../../lib/mapToCreateTourDto';

interface CreateNewTourProps {
  className?: string;
}

const CreateNewTour = memo(({ className }: CreateNewTourProps) => {
  const { control, handleSubmit, formState: { errors }, watch } = useForm({
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
      imageId: '',
      datesDeparture: []
    }
  });

  const { data: countries = [], isLoading: isCountriesLoading, isFetching, isError } = useGetAllCountriesQuery();
  const watchSelectedDepartureCountry = watch("countryDeparture");
  const { data: citiesDeparture = [], isLoading: isCitiesDepartureLoading, isFetching: isCitiesDepartureFetching, isError: isCitiesDepartureError } = useGetCitiesByCountryIdQuery(watchSelectedDepartureCountry);
  const watchSelectedArrivalCountry = watch("countryArrival");
  const { data: citiesArrival = [], isLoading: isCitiesArrivalLoading, isFetching: isCitiesArrivalFetching, isError: isCitiesArrivalError } = useGetCitiesByCountryIdQuery(watchSelectedArrivalCountry);

  const [createTour, result] = useCreateTourMutation();
  
  const onSubmit = (data: any) => {
    data.datesDeparture = data.datesDeparture.map(dateToYyyyMmDd);
    const createTourDto = mapToCreateTourDto(data)
    console.log(createTourDto);
    createTour(createTourDto);
  }

  return (
    <Card className={classNames(cls.CreateNewTour, { }, [className ?? ''])}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Col gapSize={ColGapSize.XXL} align={ColAlign.CENTER}>
          <Heading>Add tour</Heading>
          <Row className={cls.createNewTourRow}>
            <Col gapSize={ColGapSize.XXL} align={ColAlign.CENTER}>
              <Controller
                name="countryDeparture"
                control={control}
                render={({ field }) => (
                  <Select {...field} options={countries.map((country: Country) => ({ value: country.id, content: country.name }))} placeholder={'Country departure'} />
                )}
                rules={{ required: true, maxLength: 20 }}
              />
              {watchSelectedDepartureCountry && (
                <Controller
                  name="cityDeparture"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} options={citiesDeparture.map((city: City) => ({ value: city.id, content: city.name}))} placeholder={'City departure'} />
                  )}
                  rules={{ required: true, maxLength: 20 }}
                />
              )}
              <Controller
                name="countryArrival"
                control={control}
                render={({ field }) => (
                  <Select {...field} options={countries.map((country: Country) => ({ value: country.id, content: country.name }))} placeholder={'Country arrival'} />
                )}
                rules={{ required: true, maxLength: 20 }}
              />
              {watchSelectedArrivalCountry && (
                <Controller
                  name="cityArrival"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} options={citiesArrival.map((city: City) => ({ value: city.id, content: city.name}))} placeholder={'City arrival'} />
                  )}
                  rules={{ required: true, maxLength: 20 }}
                />
              )}
            </Col>
            <Col gapSize={ColGapSize.XXL} align={ColAlign.CENTER}>
              <Controller
                name="hotelId"
                control={control}
                render={({ field }) => <Input {...field} placeholder={'Hotel id'} error={!!errors.hotelId}/>}
                rules={{ required: true }}
              />
              <Controller
                name="nightsAmount"
                control={control}
                render={({ field }) => <Input {...field} placeholder={'Nights amount'} error={!!errors.nightsAmount}/>}
                rules={{ required: true, min: 1 }}
              />
              <Controller
                name="datesDeparture"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    inputPlaceholder="Select dates departure"
                    minimumDate={utils('en').getToday()} {...field}
                    inputClassName={classNames(cls.customInput, {}, [errors.datesDeparture ? cls.customInputError : ''])}
                    shouldHighlightWeekends
                    calendarPopperPosition={'bottom'}
                  />
                )}
                rules={{ required: true }}
              />
            </Col>
            <Col gapSize={ColGapSize.XXL} align={ColAlign.CENTER}>
              <Controller
                name="price"
                control={control}
                render={({ field }) => <Input {...field} placeholder={'Price'} error={!!errors.price}/>}
                rules={{ required: true, min: 0 }}
              />
              <Controller
                name="currency"
                control={control}
                render={({ field }) => <Input {...field} placeholder={'Currency'} error={!!errors.currency}/>}
                rules={{ required: true, maxLength: 3 }}
              />
              <Controller
                name="guests"
                control={control}
                render={({ field }) => <Input {...field} placeholder={'Guests'} error={!!errors.guests}/>}
                rules={{ required: true, min: 1 }}
              />
            </Col>
            <Col gapSize={ColGapSize.XXL} align={ColAlign.CENTER}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => <Input {...field} placeholder={'Description'} error={!!errors.description}/>}
                rules={{ required: true }}
              />
              <Controller
                name="imageId"
                control={control}
                render={({ field }) => <Input {...field} placeholder={'Image id'} error={!!errors.imageId}/>}
                rules={{ required: true }}
              />
            </Col>
            <Controller
              name="rating"
              control={control}
              render={({ field }) => <Input {...field} placeholder={field.name} error={!!errors.rating}/>}
              rules={{ required: true, min: 0, max: 5 }}
            />
          </Row>
          <Button theme={ButtonTheme.CONTAIN} type="submit">CREATE</Button>
        </Col>
      </form>
    </Card>
  );
});

CreateNewTour.displayName = 'CreateNewTour';

export { CreateNewTour };
