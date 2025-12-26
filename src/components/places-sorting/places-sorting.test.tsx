import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PlacesSorting } from './places-sorting';
import { SortOption } from '../../const';

describe('Component: PlacesSorting', () => {
  it('should open options list on click and handle option selection', async () => {
    const onChange = vi.fn();

    render(
      <PlacesSorting
        currentSort={SortOption.Popular}
        onChange={onChange}
      />
    );

    const optionsList = screen.getByRole('list');


    expect(optionsList).not.toHaveClass('places__options--opened');

    const [sortingLabel] = screen.getAllByText(SortOption.Popular);

    await userEvent.click(sortingLabel);

    expect(optionsList).toHaveClass('places__options--opened');


    await userEvent.click(screen.getByText(SortOption.PriceLowToHigh));


    expect(onChange).toBeCalledWith(SortOption.PriceLowToHigh);


    expect(optionsList).not.toHaveClass('places__options--opened');
  });
});
