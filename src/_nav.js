
export default {
  items: [
    {
      title: true,
      name: localStorage.getItem("name"),
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Dashboard',
      // url: '/dashboard',
      icon: 'icon-pie-chart',
    },

    {
      name: 'Airport',
      url: '/manageairport',
      icon: 'fa fa-map'
    },
    {
      name: 'AirCraft',
      url: '/manageaircrafts',
      icon: 'fa fa-users'
    },
    {
      name: 'Transaction',
      url: '/transactions',
      icon: 'fa fa-users'
    },
    {
      name: 'Reports',
      url: '/reports',
      icon: 'fa fa-users'
    },


  ],
};
