import { useParams } from 'react-router-dom'
import { Navigation } from './Main'


function RecipePage(props) {
    var { id } = useParams();
    return(
        <div>
                <Navigation />
                <div>
                    The value of props is {id}
                </div>
        </div>
    )
}

export default RecipePage;