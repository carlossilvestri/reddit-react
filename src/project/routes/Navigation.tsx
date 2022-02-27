
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from './routes';

export const Navigation = () => {
  return (
    <>
      <Suspense fallback={<span>Loading...</span>}>
        <BrowserRouter>
          <Routes>
            {routes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
            {/* Default - Route */}
            <Route
              path="/*"
              element={<Navigate to={routes[0].to} replace />}
            />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
};
