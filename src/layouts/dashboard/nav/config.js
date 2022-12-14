// component
// Permite añadir/eliminar nuevos elementos a la pagina de navegacion 
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'maps',
    path: '/dashboard/maps',
    icon: icon('ic_maps'),
  },
  {
    title: 'logs',
    path: '/dashboard/logs',
    icon: icon('ic_logs'),
  },
  {
    title: 'user',
    path: '/admin/user',
    icon: icon('ic_user'),
  },
  {
    title: 'organization',
    path: '/admin/organization',
    icon: icon('ic_organization'),
  },
  {
    title: 'trafficligth',
    path: '/admin/trafficligth',
    icon: icon('ic_trafficligth'),
  },
];

export default navConfig;
