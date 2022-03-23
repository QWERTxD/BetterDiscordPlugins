import ScrollerThin from '@discord/scrollbars';
import { Modals, WebpackModules } from '@zlibrary';
import { ModalActions } from '@zlibrary/discord';
import { Component } from 'react';
import Results from './Results';
import Result from './Result';
import PluginIcon from './PluginIcon';
import ThemeIcon from './ThemeIcon';

const classes = {
    ...WebpackModules.getByProps('quickswitcher', 'miscContainer', 'scroller'),
    ...WebpackModules.getByProps('input', 'container', 'emptyStateCTA', 'protip'),
    ...WebpackModules.getByProps('contentDefault', 'guildIconContainer', 'iconContainer', 'name'),
    ...WebpackModules.getByProps('icon', 'header', 'iconContainer'),    
    ...WebpackModules.getByProps('iconContainer', 'match', 'gameIconSize', 'icon'),
    ...WebpackModules.getByProps('inline', 'tip', 'tip'),
    ...WebpackModules.getByProps('protip'),
    ...WebpackModules.getByProps('autocompleteQuerySymbol', 'emptyStateCTA', 'emptyStateNote')
};
const Modal = WebpackModules.getByProps('ModalFooter');
const Protip = WebpackModules.getByDisplayName('Protip');
const { open } = WebpackModules.getByProps('open', 'close', 'setSection');

export default class QuickToggler extends Component {
    constructor() {
        super();
        this.state = {
            query: ''
        }
    }

    render() {
        return (
            <Modal.ModalRoot transitionState={this.props.transitionState}>
                <div className={classes.quickswitcher}>
                    <input className={classes.input} placeholder='What addon are you looking for?' onChange={e => this.setState({query: e.target.value})}/>
                    <div style={{height: 15}}/>
                    <Result
                        name='Plugins'
                        icon={<PluginIcon fill='var(--interactive-normal)'/>}
                        onClick={() => {
                            open('plugins');
                            ModalActions.closeAllModals();
                        }}
                    />
                    <Result
                        name='Themes'
                        icon={<ThemeIcon fill='var(--interactive-normal)'/>}
                        onClick={() => {
                            open('themes');
                            ModalActions.closeAllModals();
                        }}
                    />
                    <div style={{height: 10}}/>
                    <ScrollerThin className={classes.scroller}>
                        <Results
                        query={this.state.query}
                        />
                    </ScrollerThin>
                    <Modal.ModalContent>
                        <Protip className={classes.protip} type={classes.inline}>
                            Use <span className={classes.autocompleteQuerySymbol}>$enabled</span>, <span className={classes.autocompleteQuerySymbol}>$disabled</span>, <span className={classes.autocompleteQuerySymbol}>$plugin</span>, and <span className={classes.autocompleteQuerySymbol}>$theme</span> to filter results.
                        </Protip>
                    </Modal.ModalContent>
                </div>
            </Modal.ModalRoot>
        )
    }
}