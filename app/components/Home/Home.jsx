import React from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { selectInterests, deselectInterests } from '../../actions/apiActions.js';

const messages = defineMessages({
    iHeartInterests: {
        id: 'app.home.iHeartInterests',
        description: 'List of user liked interests',
        defaultMessage: 'I {heart} {interest1} {interest2} {interest3}'
    },

    whatYouLove: {
        id: 'app.home.whatYouLove',
        description: 'What you love header',
        defaultMessage: 'WHAT DO YOU LOVE?'
    }
});

const glyph = <span className="glyphs">&#57344;</span>;
const maxOptions = 3;

export class Home extends React.Component {
    render() {
        return (
            <div id="tg-root">
                <div id="tg-selectedInterests">
                    <SelectedInterests interests={this.props.interests} dispatch={this.props.dispatch}/>
                </div>
                <div>
                    <span>&nbsp;</span>
                    <InterestOptionsList interests={this.props.interests} dispatch={this.props.dispatch}/>
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    interests: React.PropTypes.object,
    dispatch: React.PropTypes.func
};

export default connect((state) => ({
    interests: state.interests
}))(Home);

var SelectedInterests = React.createClass({
    propTypes: {
        interests: React.PropTypes.object
    },

    render() {
        let heart = glyph;
        let interest = [];

        for (var i = 0; i < maxOptions; i++) {
            var interestItem = this.props.interests.selected[i];
            if(interestItem) {
                interest[i] = <span className='interestItemSelected'>{interestItem}</span>;
            } else {
                interest[i] = <span className='interestItem'>{interestItem}</span>;
            }
        }

        let strVals = {
            heart: heart,
            interest1: interest[0],
            interest2: interest[1],
            interest3: interest[2]
        };

        return(
            <div id="tg-selectedInterests">
            <FormattedMessage {...messages.iHeartInterests} values={strVals}/>
            <Link to="/careerpicker" activeClassName="active"><span>{heart}</span></Link>
            </div>
        );
    }
});

var InterestOptionsList = React.createClass({
    propTypes: {
        interests: React.PropTypes.object,
        dispatch: React.PropTypes.func
    },

    handleClick(interest) {
        interest['selected'] = !interest['selected'];
        if (interest['selected'] && this.props.interests.selected.length < 3) {
            this.props.dispatch(selectInterests([interest.id]));
        } else if (!interest['selected']) {
            this.props.dispatch(deselectInterests([interest.id]));
        }
    },

    render() {
        var isSelected = function (item) {
            if (item) {
                return "optionButtonSelected";
            }
            return "optionButton";
        };

        var selectedData = this.props.interests.selected;
        var tableData = this.props.interests.data.map(function (interest){
            interest['selected'] = selectedData.indexOf(interest.id) >= 0 ? true : false;
            return interest;
        });

        var rows = [];
        var colMax = Math.ceil(tableData.length / 3.0);
        for (var i = 0; i < tableData.length; i+=colMax) {
            var row = [];
            for (var n = i; n < i + colMax; n++) {
                if (tableData[n]) {
                    row.push(<td key={tableData[n].id}><span className={isSelected(tableData[n].selected)} onClick={this.handleClick.bind(this, tableData[n])}>{glyph} {tableData[n].name}</span></td>);
                }
            }
            rows.push(<tr key={i}>{row}</tr>);
        }

        return(
            <div>
                <div id="tg-interestOptionsListHeader">
                    <FormattedMessage {...messages.whatYouLove}/>
                </div>
                <div id="tg-interestOptionsList">
                    <table id="interestsListTable">
                        <tbody>
                            {rows}
                            </tbody>
                        </table>
                </div>
            </div>
        );
    }
});
