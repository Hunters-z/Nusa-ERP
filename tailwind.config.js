export default {
  content: ['./index.html','./src/**/*.{js,jsx}'],
  theme: { extend: { colors: {
    paper:'#F7F8F4', ink:'#1A2421', inksoft:'#5C6B64', line:'#E2E6DE',
    teal:{DEFAULT:'#0E7C66',ink:'#0A5C4D',soft:'#E3F2E8'},
    amber:{DEFAULT:'#E8A33D',soft:'#FBF0DC'},
    coral:{DEFAULT:'#D95B43',soft:'#F9E3DF'},
    sidebar:'#12211C'
  }, fontFamily: { disp:['Sora','sans-serif'], body:['"Plus Jakarta Sans"','sans-serif'] } } },
  plugins: []
}