import { Segment } from 'semantic-ui-react';
import './App.css';
import FormProduto from './views/produto/FormProduto';

function App() {

 return (

   <div className="App">
    
     <FormProduto />

     <div style={{marginTop: '6%'}}>
       <Segment vertical color='grey' size='tiny' textAlign='center'>
         &copy; 2025 - Projeto WEB III - IFPE Jaboatão dos Guararapes
       </Segment>
     </div>

   </div>
 );
}

export default App;
