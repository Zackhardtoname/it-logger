import React, {useEffect} from 'react';
import { connect } from "../../../node_modules/react-redux"
import LogItem from "./LogItem"
import Preloader from "../layout/Preloader"
import PropTypes from "prop-types"
import { getLogs } from "../../actions/logActions"

// props are everything from the state
function Logs({ logReducer: {logs, loading}, getLogs}) {


    useEffect(() => {
        getLogs()
        //eslint-disable-next-line
    }, [])

    if (loading || logs === null) {
        return <Preloader />
    }

    return (
        <ul className="container collection with-header">
            <li className="collection-header">
                <h4 className="center">System Logs</h4>
            </li>
            {!loading && logs.length === 0 ? (
                <p className="center">No logs to show...</p>
            ) : (
                logs.map(log => {
                    return <LogItem log={log} key={log.id}/>
                })
            )}
        </ul>
    );
}

Logs.propTypes = {
    logReducer: PropTypes.object.isRequired,
    getLogs: PropTypes.func.isRequired,
}

// bring app level state as props
// log: from root reducer
const mapStateToProps = state => ({
    logReducer: state.logReducer
})

const mapDispatchToProps = {
    getLogs
}

//the second para: any action we want to run
export default connect(mapStateToProps, mapDispatchToProps)(Logs);