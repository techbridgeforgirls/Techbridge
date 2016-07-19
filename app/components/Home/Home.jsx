import React from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';

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
    },

    continue: {
        id: 'app.home.continue',
        description: 'Continue button',
        defaultMessage: '{arrow}'
    }
});

const glyph = <span className="glyphs">&#57344;</span>;

export class Home extends React.Component {
    handleClick() {
        //go to next page with query parameters
    }

    render() {
        return (
            <div id="tg-root">
                <div id="tg-iHeartHeader">
                    <InterestsList/>
                </div>
                <div>
                    <span>&nbsp;</span>
                    <InterestOptions/>
                </div>
            </div>
        );
    }
}

var InterestsList = React.createClass({
    propTypes: {
        interestList: React.PropTypes.array,
        itemsSelected: React.PropTypes.number
    },
    getDefaultProps: function() {
        return {
          interestList: ['', '', ''],
          itemsSelected: 0
        };
    },
    render() {
        let heart = glyph;
        let interest1 = '';
        let interest2 = '';
        let interest3 = '';

        var isSelected = function (item) {
            if (item.length > 0) {
                return "interestItemSelected";
            }
            return "interestItem";
        };

        if (this.props.interestList) {
          if (this.props.interestList.length > 0) {
            var interestItem1 = this.props.interestList[0];
            interest1 = <span className= {isSelected(interestItem1)}>{interestItem1}</span>;
          }
          if (this.props.interestList.length > 1) {
            var interestItem2 = this.props.interestList[1];
            interest2 = <span className= {isSelected(interestItem2)}>{interestItem2}</span>;
          }
          if (this.props.interestList.length > 2) {
            var interestItem3 = this.props.interestList[2];
            interest3 = <span className= {isSelected(interestItem3)}>{interestItem3}</span>;
          }
        }

        let strVals = {
          heart: heart,
          interest1: interest1,
          interest2: interest2,
          interest3: interest3
        };

        return(
          <div id="tg-iHeartHeader">
            <FormattedMessage {...messages.iHeartInterests} values={strVals}/>
          </div>
        );
    }
});

var InterestOptions = React.createClass({
    propTypes: {
        interestOptions: React.PropTypes.array
    },
    getDefaultProps: function() {
        return {
          interestOptions: ['Technology', 'Animals', 'Experiments', 'Art', 'Baking', 'Sports', 'Food', 'Games', 'Music', 'Nature', 'Movies', 'Singing', 'Math', 'Computers', 'Science']
        };
    },
    getInitialState: function() {
        return { isSelected: false };
    },

    handleClick(selectedOption) {
        // console.log("hit");
        this.setState({ isSelected: !this.state.isSelected });
        InterestsList.props.interestList[InterestsList.props.itemsSelected](selectedOption);
        InterestsList.props.itemsSelected += 1;
    },

    render() {
        var isSelected = function (item) {
            if (item) {
                return "optionButtonSelected";
            }
            return "optionButton";
        };

        var tableData = this.props.interestOptions;
        var rows = [];
        var colMax = Math.ceil(tableData.length / 3.0);
        for (var i = 0; i < tableData.length; i+=colMax) {
            var row = [];
            for (var n = i; n < i + colMax; n++) {
                if (tableData[n]) {
                    row.push(<td key={tableData[n]}><span className={isSelected(this.state.isSelected)} onClick={this.handleClick.bind(this, tableData[n])}>{glyph} {tableData[n]}</span></td>);
                }
            }
            rows.push(<tr key={i}>{row}</tr>);
        }
        return(
            <div>
                <div id="tg-optionsHeader">
                    <FormattedMessage {...messages.whatYouLove}/>
                </div>
                <div id="tg-optionsList">
                    <table id="interestTable">
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
});

