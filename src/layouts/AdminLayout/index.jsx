import { Navigate, Outlet } from 'react-router-dom';

import { Container } from './styles'
import { SideNavadmin } from '../../components';

export function AdminLayout() {
  const { admin: isAdmin } = JSON.parse(
    localStorage.getItem('devburger:userData'),
  );

  return isAdmin ? (
    <Container>
      <SideNavadmin />
      <main>
        <section>
          <Outlet />
        </section>
      </main>
    </Container>
  ) : (
    <Navigate to="/login" />
  );
}
