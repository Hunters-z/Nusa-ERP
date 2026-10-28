export default {
  content: ['./index.html','./src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: {
      paper:'#F5F8FC', ink:'#0F1B2D', inksoft:'#64748B', line:'#E3EAF3',
      ocean:{DEFAULT:'#0891B2',ink:'#0E7490',deep:'#155E75',soft:'#E0F2FE'},
      navy:{DEFAULT:'#0C1B33',mid:'#10254A'},
      amber:{DEFAULT:'#F59E0B',soft:'#FEF3C7'},
      coral:{DEFAULT:'#EF4444',soft:'#FEE2E2'},
      mint:{DEFAULT:'#10B981',soft:'#D1FAE5'},
    },
    fontFamily: { disp:['Sora','sans-serif'], body:['"Plus Jakarta Sans"','sans-serif'] },
    boxShadow: { soft:'0 1px 3px rgba(15,27,45,.06), 0 6px 20px rgba(15,27,45,.05)', pop:'0 10px 30px rgba(8,145,178,.25)' },
  } },
  plugins: []
}
