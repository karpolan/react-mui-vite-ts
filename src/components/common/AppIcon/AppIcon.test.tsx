import { render, screen } from '@testing-library/react';
import AppIcon from './AppIcon';
import { APP_ICON_SIZE } from '@/components/config';
import { randomColor, randomText } from '@/utils/text';
import { IconName, ICONS } from './config';

const ComponentToTest = AppIcon;

/**
 * Tests for <AppIcon/> component
 */
describe('<AppIcon/> component', () => {
  it('renders itself', () => {
    const testId = randomText(8);
    render(<ComponentToTest data-testid={testId} icon="default" />);
    const svg = screen.getByTestId(testId);
    expect(svg).toBeDefined();
    expect(svg).toHaveAttribute('data-icon', 'default');
    expect(svg).toHaveAttribute('size', String(APP_ICON_SIZE)); // default size
    expect(svg).toHaveAttribute('height', String(APP_ICON_SIZE)); // default size when .size is not set
    expect(svg).toHaveAttribute('width', String(APP_ICON_SIZE)); // default size when .size is not se
  });

  it('supports .color property', () => {
    const testId = randomText(8);
    const color = randomColor(); // Note: 'rgb(255, 128, 0)' format is used by react-icons npm, so tests may fail
    render(<ComponentToTest data-testid={testId} color={color} icon="default" />);
    const svg = screen.getByTestId(testId);
    expect(svg).toHaveAttribute('data-icon', 'default');
    // expect(svg).toHaveAttribute('color', color); // TODO: Looks like MUI Icons exclude .color property from <svg> rendering
    expect(svg).toHaveStyle(`color: ${color}`);
    expect(svg).toHaveAttribute('fill', 'currentColor'); // .fill must be 'currentColor' when .color property is set
  });

  it('supports .icon property', () => {
    // Verify that all icons are supported
    for (const icon of Object.keys(ICONS) as IconName[]) {
      const testId = randomText(8);
      render(<ComponentToTest data-testid={testId} icon={icon} />);
      const svg = screen.getByTestId(testId);
      expect(svg).toBeDefined();
      expect(svg).toHaveAttribute('data-icon', icon);
    }
  });

  it('supports .size property', () => {
    const testId = randomText(8);
    const size = Math.floor(Math.random() * 128) + 1;
    render(<ComponentToTest data-testid={testId} icon="default" size={size} />);
    const svg = screen.getByTestId(testId);
    expect(svg).toHaveAttribute('size', String(size));
    expect(svg).toHaveAttribute('height', String(size));
    expect(svg).toHaveAttribute('width', String(size));
  });

  it('supports .title property', () => {
    const testId = randomText(8);
    const title = randomText(16);
    render(<ComponentToTest data-testid={testId} icon="default" title={title} />);
    const svg = screen.getByTestId(testId);
    expect(svg).toBeDefined();
    expect(svg).toHaveAttribute('title', title);
  });
});
