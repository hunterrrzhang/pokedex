(this.webpackJsonppokedex=this.webpackJsonppokedex||[]).push([[0],{114:function(e,t,n){"use strict";n.r(t);var o=n(3),a=n.n(o),s=n(43),i=n.n(s),c=(n(48),n.p,n(49),n(0));var r=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,115)).then((function(t){var n=t.getCLS,o=t.getFID,a=t.getFCP,s=t.getLCP,i=t.getTTFB;n(e),o(e),a(e),s(e),i(e)}))},h=n(4),l=n(5),u=n(14),d=n(15),f=n(17),p=n(16),m=(n(95),function(e){Object(f.a)(n,e);var t=Object(p.a)(n);function n(){return Object(u.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"render",value:function(){return Object(c.jsxs)("div",{className:"pokemon",children:[Object(c.jsx)("h1",{children:this.props.info.name}),this.props.info.sprites.other.home.front_default?Object(c.jsx)("img",{src:this.props.info.sprites.other.home.front_default,alt:"Pokemon Image"}):this.props.info.sprites.other["official-artwork"].front_default?Object(c.jsx)("img",{src:this.props.info.sprites.other["official-artwork"].front_default,alt:"Pokemon Image2"}):Object(c.jsx)("img",{src:this.props.info.sprites.front_default,alt:"Pokemon Image2"}),Object(c.jsxs)("p",{children:["Weight: ",this.props.info.weight," |  Height ",this.props.info.height]}),Object(c.jsx)("p",{})]})}}]),n}(a.a.Component)),g=function(e){Object(f.a)(o,e);var t=Object(p.a)(o);function o(e){var n;return Object(u.a)(this,o),(n=t.call(this,e)).state={Pokemon_data:{},number_of_pokemons:900,number_per_batch:10,matched_keys:[],searching:!1,percent_loaded:0},n}return Object(d.a)(o,[{key:"getPokemonDataUsingPackage",value:function(){for(var e=this,t=new(n(18)),o=1;o<=this.state.number_of_pokemons;o++)t.getPokemonByName(o,(function(t,n){if(n)console.log(n);else{var o=t.name;e.setState((function(n){return{Pokemon_data:Object(l.a)(Object(l.a)({},n.Pokemon_data),{},Object(h.a)({},o,t)),percent_loaded:Math.round(Object.keys(e.state.Pokemon_data).length/898*100)}}))}}))}},{key:"fetchPokemonDataUsingAxios",value:function(e){var t=this,o=n(96);o.get(e).then((function(e){console.log(e.data.results);for(var n=e.data.results,a=0;a<n.length;a++)o.get(n[a].url).then((function(n){n=n.data,console.log(n);var o=n.name;t.setState((function(a){return{Pokemon_data:Object(l.a)(Object(l.a)({},a.Pokemon_data),{},Object(h.a)({},o,n)),percent_loaded:Math.round(Object.keys(t.state.Pokemon_data).length/e.data.count*100)}}))})).catch((function(e){console.log(e)}));e.data.next&&t.fetchPokemonDataUsingAxios(e.data.next)})).catch((function(e){console.log(e)}))}},{key:"componentDidMount",value:function(){this.fetchPokemonDataUsingAxios("https://pokeapi.co/api/v2/pokemon?offset=0&limit=100")}},{key:"handleKeyPress",value:function(e){if(""===e.target.value)this.setState({searching:!1});else{var t=e.target.value.toLowerCase();console.log("key pressed"+e.target.value);var n=Object.keys(this.state.Pokemon_data),o=n.map((function(e){return e.includes(t)})),a=n.filter((function(e,t){return o[t]})).sort();console.log("hiii"),console.log(n),console.log(o),console.log(a),this.setState({matched_keys:a,searching:!0})}}},{key:"render",value:function(){var e=this;return console.log("Searching: "),console.log(this.state.searching),console.log(Object.keys(this.state.Pokemon_data).length),Object(c.jsxs)("div",{children:[Object(c.jsxs)("div",{className:"inputContainer",children:[Object(c.jsx)("input",{className:"inputArea",id:"inputBox",placeholder:"Find ur Pokemon",onChange:function(t){return e.handleKeyPress(t)}}),100!=this.state.percent_loaded&&Object(c.jsxs)("p",{children:["loading Pokemons... ",this.state.percent_loaded,"% has arrived"]})]}),Object(c.jsx)("div",{className:"container",children:Object.keys(this.state.Pokemon_data).length>=this.state.number_per_batch&&this.state.searching?this.state.matched_keys.map((function(t,n){return Object(c.jsx)(m,{info:e.state.Pokemon_data[t]},n)})):Object.keys(this.state.Pokemon_data).map((function(t,n){return Object(c.jsx)(m,{info:e.state.Pokemon_data[t]},n)}))})]})}}]),o}(a.a.Component);i.a.render(Object(c.jsx)(g,{}),document.getElementById("root")),r()},48:function(e,t,n){},49:function(e,t,n){},70:function(e,t){},95:function(e,t,n){}},[[114,1,2]]]);
//# sourceMappingURL=main.34742633.chunk.js.map