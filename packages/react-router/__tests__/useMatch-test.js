import * as React from 'react';
import { create as createTestRenderer } from 'react-test-renderer';
import { MemoryRouter as Router, Routes, Route, useMatch } from 'react-router';

describe('useMatch', () => {
  describe('when the path matches the current URL', () => {
    it('returns the match', () => {
      let match;
      function Layout() {
        match = useMatch('home');
        return null;
      }

      function Home() {
        return <h1>Home</h1>;
      }

      function About() {
        return <h1>About</h1>;
      }

      createTestRenderer(
        <Router initialEntries={['/home']}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Route>
          </Routes>
        </Router>
      );

      expect(match).toMatchObject({
        path: 'home',
        pathname: '/home',
        params: {}
      });
    });

    it('should not include trailing slash in params with /*', () => {
      let match;
      function Layout() {
        match = useMatch('home/*');
        return null;
      }

      function Home() {
        return <h1>Home</h1>;
      }

      function About() {
        return <h1>About</h1>;
      }

      createTestRenderer(
        <Router initialEntries={['/home/param']}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/home/param" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Route>
          </Routes>
        </Router>
      );

      expect(match.params).toEqual({ "*" : 'param' });
    });
  });

  describe('when the path does not match the current URL', () => {
    it('returns null', () => {
      let match;
      function Layout() {
        match = useMatch('about');
        return null;
      }

      function Home() {
        return <h1>Home</h1>;
      }

      function About() {
        return <h1>About</h1>;
      }

      createTestRenderer(
        <Router initialEntries={['/home']}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Route>
          </Routes>
        </Router>
      );

      expect(match).toBe(null);
    });

    it('returns null for path ends with /*', () => {
      let match;
      function Layout() {
        match = useMatch('ho/*');
        return null;
      }

      function Home() {
        return <h1>Home</h1>;
      }

      function About() {
        return <h1>About</h1>;
      }

      createTestRenderer(
        <Router initialEntries={['/home']}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Route>
          </Routes>
        </Router>
      );

      expect(match).toBe(null);
    });
  });
});
