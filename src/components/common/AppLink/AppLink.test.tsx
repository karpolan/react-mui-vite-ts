import { MemoryRouter } from 'react-router-dom';
import { FunctionComponent } from 'react';
import { render, screen } from '@testing-library/react';
import AppLink, { AppLinkProps } from '.';
import { randomColor, capitalize } from '@/utils/text';

/**
 * AppLink wrapped with BrowserRouter
 */
const ComponentToTest: FunctionComponent<
  AppLinkProps & { pathnameToTest?: string }
> = ({ pathnameToTest = '/test/', ...props }) => (
  <MemoryRouter initialEntries={[{ pathname: pathnameToTest }]}>
    <AppLink {...props} />
  </MemoryRouter>
);

/**
 * Tests for <AppLink/> component
 */
describe('<AppLink/> component', () => {
  it('renders itself', () => {
    const text = 'sample text';
    const url = 'https://example.com/';
    render(<ComponentToTest href={url}>{text}</ComponentToTest>);
    const link = screen.getByText(text);
    expect(link).toBeDefined();
    expect(link).toHaveAttribute('href', url);
    expect(link).toHaveTextContent(text);
  });

  it('supports external link', () => {
    let text = 'external link via .href prop';
    const url = 'https://example.com/';
    render(<ComponentToTest href={url}>{text}</ComponentToTest>);
    // screen.debug();
    let link = screen.getByText(text);
    expect(link).toBeDefined();
    expect(link).toHaveAttribute('href', url);
    expect(link).toHaveTextContent(text);
    expect(link).toHaveAttribute('target', '_blank'); // Open external links in new Tab by default
    expect(link).toHaveAttribute('rel'); // For links opened in new Tab rel="noreferrer noopener" is required
    let rel = (link as any)?.rel;
    expect(rel.includes('noreferrer')).toBeTruthy(); // ref="noreferrer" check
    expect(rel.includes('noopener')).toBeTruthy(); // rel="noreferrer check

    text = 'external link via .to prop';
    render(<ComponentToTest to={url}>{text}</ComponentToTest>);
    // screen.debug();
    link = screen.getByText(text);
    expect(link).toBeDefined();
    expect(link).toHaveAttribute('href', url);
    expect(link).toHaveTextContent(text);
    expect(link).toHaveAttribute('target', '_blank'); // Open external links in new Tab by default
    expect(link).toHaveAttribute('rel'); // For links opened in new Tab rel="noreferrer noopener" is required
    rel = (link as any)?.rel;
    expect(rel.includes('noreferrer')).toBeTruthy(); // ref="noreferrer" check
    expect(rel.includes('noopener')).toBeTruthy(); // rel="noreferrer check
  });

  it('understands link without protocol //aaa.com passed in .to prop as external', () => {
    const text = 'external link without protocol';
    const url = '//example.com/';
    render(<ComponentToTest to={url}>{text}</ComponentToTest>);
    // screen.debug();
    const link = screen.getByText(text);
    expect(link).toBeDefined();
    expect(link).toHaveAttribute('href', url);
    expect(link).toHaveTextContent(text);
    expect(link).toHaveAttribute('target', '_blank'); // Open external links in new Tab by default
    expect(link).toHaveAttribute('rel'); // For links opened in new Tab rel="noreferrer noopener" is required
    const rel = (link as any)?.rel;
    expect(rel.includes('noreferrer')).toBeTruthy(); // ref="noreferrer" check
    expect(rel.includes('noopener')).toBeTruthy(); // rel="noreferrer check
  });

  it('understands relative links passed in .href prop as internal', () => {
    const text = 'external link without protocol';
    const url = '/relative-link';
    render(<ComponentToTest href={url}>{text}</ComponentToTest>);
    // screen.debug();
    const link = screen.getByText(text);
    expect(link).toBeDefined();
    expect(link).toHaveAttribute('href', url);
    expect(link).toHaveTextContent(text);
    expect(link).not.toHaveAttribute('target');
    expect(link).not.toHaveAttribute('rel');
  });

  it('supports internal link', () => {
    const text = 'internal link';
    const url = '/internal-link';
    render(<ComponentToTest href={url}>{text}</ComponentToTest>);
    // screen.debug();
    const link = screen.getByText(text);
    expect(link).toBeDefined();
    expect(link).toHaveAttribute('href', url);
    expect(link).toHaveTextContent(text);
    expect(link).not.toHaveAttribute('target');
    expect(link).not.toHaveAttribute('rel');
  });

  it('supports .openInNewTab property', () => {
    // External link with openInNewTab={false}
    let text = 'external link in same tab';
    let url = 'https://example.com/';
    render(
      <ComponentToTest href={url} openInNewTab={false}>
        {text}
      </ComponentToTest>
    );
    // screen.debug();
    let link = screen.getByText(text);
    expect(link).toBeDefined();
    expect(link).toHaveAttribute('href', url);
    expect(link).toHaveTextContent(text);
    expect(link).not.toHaveAttribute('target');
    expect(link).not.toHaveAttribute('rel');

    // Internal link with openInNewTab={true}
    text = 'internal link in new tab';
    url = '/internal-link-in-new-tab';
    render(
      <ComponentToTest to={url} openInNewTab>
        {text}
      </ComponentToTest>
    );
    link = screen.getByText(text);
    expect(link).toBeDefined();
    expect(link).toHaveAttribute('href', url);
    expect(link).toHaveTextContent(text);
    expect(link).toHaveAttribute('target', '_blank'); // Open links in new Tab
    expect(link).toHaveAttribute('rel'); // For links opened in new Tab rel="noreferrer noopener" is required
    const rel = (link as any)?.rel;
    expect(rel.includes('noreferrer')).toBeTruthy(); // ref="noreferrer" check
    expect(rel.includes('noopener')).toBeTruthy(); // rel="noreferrer check
  });

  it('supports .className property', () => {
    let text = 'internal link with specific class';
    let url = '/internal-link-with-class';
    let className = 'someClassName';
    render(
      <ComponentToTest to={url} className={className}>
        {text}
      </ComponentToTest>
    );
    let link = screen.getByText(text);
    expect(link).toBeDefined();
    expect(link).toHaveClass(className);
  });

  it('supports .color property', () => {
    // Check several times with random colors
    for (let i = 1; i < 5; i++) {
      let text = `link #${i} with .color property`;
      let url = '/internal-link-with-color';
      let color = randomColor();
      render(
        <ComponentToTest to={url} color={color}>
          {text}
        </ComponentToTest>
      );
      let link = screen.getByText(text);
      expect(link).toBeDefined();
      expect(link).toHaveStyle(`color: ${color}`);
    }
  });

  it('supports .activeClassName property in pair with .to property', () => {
    let link;
    let textActive = 'internal link with activeClassName';
    let textPassive = 'internal link without activeClassName';
    let url = '/internal-link';
    let activeClassName = 'someClassName';

    // router.pathhname doesn't match .to prop
    render(
      <ComponentToTest
        pathnameToTest={'not-' + url}
        to={url}
        activeClassName={activeClassName}
      >
        {textPassive}
      </ComponentToTest>
    );
    link = screen.getByText(textPassive);
    expect(link).toBeDefined();
    expect(link).not.toHaveClass(activeClassName);

    // router.pathhname matches .to prop
    render(
      <ComponentToTest
        pathnameToTest={url}
        to={url}
        activeClassName={activeClassName}
      >
        {textActive}
      </ComponentToTest>
    );
    link = screen.getByText(textActive);
    expect(link).toBeDefined();
    expect(link).toHaveClass(activeClassName);
  });

  it('supports .activeClassName property in pair with .href property', () => {
    let link;
    let textActive = 'external link with activeClassName';
    let textPassive = 'external link without activeClassName';
    let url = '/external-link.com';
    let activeClassName = 'someClassName';

    // router.pathhname doesn't match .href prop
    render(
      <ComponentToTest
        pathnameToTest={'not-' + url}
        href={url}
        activeClassName={activeClassName}
      >
        {textPassive}
      </ComponentToTest>
    );
    link = screen.getByText(textPassive);
    expect(link).toBeDefined();
    expect(link).not.toHaveClass(activeClassName);

    // router.pathhname matches .href prop
    render(
      <ComponentToTest
        pathnameToTest={url}
        href={url}
        activeClassName={activeClassName}
      >
        {textActive}
      </ComponentToTest>
    );
    link = screen.getByText(textActive);
    expect(link).toBeDefined();
    expect(link).toHaveClass(activeClassName);
  });

  it('supports .underline property', () => {
    // Enumerate all possible values
    ['always', 'hover', 'none'].forEach((underline) => {
      let text = `link with .underline == "${underline}"`;
      let url = '/internal-link-with-underline';
      render(
        <ComponentToTest to={url} underline={underline as any}>
          {text}
        </ComponentToTest>
      );
      let link = screen.getByText(text);
      expect(link).toBeDefined();
      underline === 'always'
        ? expect(link).toHaveStyle('text-decoration: underline')
        : expect(link).toHaveStyle('text-decoration: none');
      // TODO: make "hover" test with "mouse moving"
      expect(link).toHaveClass(`MuiLink-underline${capitalize(underline)}`);
    });
  });
});
