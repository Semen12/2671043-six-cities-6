import { render, screen } from '@testing-library/react';
import { LocationsList } from './locations-list'; // Проверь путь
import { CITIES } from '../../const'; // Путь к константам

describe('Component: LocationsList', () => {
  it('should render correctly', () => {
    const activeCity = CITIES[0]; // Берем первый город как активный (например, Paris)

    render(
      <LocationsList
        cityActive={activeCity}
        onCityChange={vi.fn()}
      />
    );

    CITIES.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });


    const activeLink = screen.getByText(activeCity).closest('a');

    expect(activeLink).toHaveClass('tabs__item--active');
  });
});
