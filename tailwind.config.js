export default {
  content: ['./index.html','./src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: {
      // FinPoint-style dark premium
      bg:'#101013', card:'#1A1A1E', card2:'#212126', line:'#2A2A31',
      ink:'#F4F4F5', inksoft:'#A0A0A8', dim:'#6E6E76',
      hero:{DEFAULT:'#FF5A1F', soft:'rgba(255,90,31,.12)'},
      lime:{DEFAULT:'#22C55E', soft:'rgba(34,197,94,.12)'},
      gold:{DEFAULT:'#EAB308', soft:'rgba(234,179,8,.12)'},
      coral:{DEFAULT:'#EF4444', soft:'rgba(239,68,68,.12)'},
      bluea:{DEFAULT:'#3B82F6', soft:'rgba(59,130,246,.12)'},
      // alias kelas lama → gaya FinPoint
      paper:'#212126', ocean:{DEFAULT:'#FF5A1F',ink:'#E64A12',deep:'#CC4110',soft:'rgba(255,90,31,.12)'},
      navy:{DEFAULT:'#1A1A1E',mid:'#212126'}, inksoft2:'#6E6E76',
      amber:{DEFAULT:'#EAB308', soft:'rgba(234,179,8,.12)'},
      mint:{DEFAULT:'#22C55E', soft:'rgba(34,197,94,.12)'},
    },
    fontFamily: { disp:['Sora','sans-serif'], body:['"Plus Jakarta Sans"','sans-serif'] },
    boxShadow: { soft:'0 2px 10px rgba(0,0,0,.35)', pop:'0 10px 30px rgba(255,90,31,.25)' },
    borderRadius: { xl2:'20px' },
  } },
  plugins: []
}
