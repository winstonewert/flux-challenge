import React from 'react'
import {connect} from 'react-redux'
import {obiwanShouldInvestigate} from './data'
import classNames from 'classnames'

function DarkJedi({jedi, obiwanLocationId}) {
    if (jedi.name) {
        var style;
        if (obiwanLocationId == jedi.homeworld.id) {
            style = {color: "red"}
        } else {
            style = {}
        }
        return <li className="css-slot" style={style}>
            <h3>{jedi.name}</h3>
            <h6>Homeworld: {jedi.homeworld.name}</h6>
        </li>
    } else {
        return <li className="css-slot">
        </li>
    }
}

const NavigationButton = ({disabled, className, onClick}) => (
    <button 
        className={classNames(className, {"css-button-disabled" : disabled})}
        onClick={onClick}
        disabled={disabled}/>
)

class DarkJediList extends React.Component {
	render() {
		var can_go_up = !this.props.obiwan_should_investigate 
			&& this.props.dark_jedi[0].master
			&& this.props.dark_jedi[0].master.id;

		var can_go_down = !this.props.obiwan_should_investigate 
			&& this.props.dark_jedi[4].master
			&& this.props.dark_jedi[4].apprentice.id;

		return <section className="css-scrollable-list">
			<ul className="css-slots">
				{_.map(this.props.dark_jedi, (jedi) => 
                    <DarkJedi 
                        key={jedi.id}
                        jedi={jedi}
                        obiwanLocationId={this.props.obiwan_location_id} />
                 )}
			</ul>
			<div className="css-scroll-buttons">
				<NavigationButton className="css-button-up" onClick={this.props.up_clicked} disabled={!can_go_up} />
				<NavigationButton className="css-button-down" onClick={this.props.down_clicked} disabled={!can_go_down} />
			</div>
		</section>
	}
}

function mapStateToProps(state) {
	return {
		obiwan_should_investigate: obiwanShouldInvestigate(state),
		obiwan_location_id: state.obiwan_location.id,
		dark_jedi: state.dark_jedi
	}
}

const ACTIONS = {
    down_clicked: () => ({type: "DOWN_CLICKED"}),
    up_clicked: () => ({type: "UP_CLICKED"})
}

export default connect(mapStateToProps,ACTIONS)(DarkJediList);

