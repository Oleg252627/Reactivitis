import { useEffect } from 'react'
import {withRouter} from 'react-router-dom'

const ScrollToTop = ({children, location: {patchname}}: any) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    })
    return children;
}
export default withRouter(ScrollToTop);
