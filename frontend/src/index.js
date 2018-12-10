import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MyApp from './MyApp';
import registerServiceWorker from './registerServiceWorker';
import './css/bootstrap-custom.css'
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

// function Start() {
// 	return(
// 		<div>
//     <div><App /></div>
//     <Clock />
//     <Button bsStyle="primary">Primary</Button>
//     </div>
// 	);
// }

ReactDOM.render(

	<MyApp />,
	document.getElementById('root')
);
registerServiceWorker();
