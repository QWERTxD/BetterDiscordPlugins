import { joinClassNames } from '@discord/utils'
import { WebpackModules } from '@zlibrary'
import { useState } from 'react'

const classes = {
    ...WebpackModules.getByProps('quickswitcher', 'miscContainer', 'scroller'),
    ...WebpackModules.getByProps('input', 'container', 'emptyStateCTA', 'protip'),
    ...WebpackModules.getByProps('contentDefault', 'guildIconContainer', 'iconContainer', 'name'),
    ...WebpackModules.getByProps('icon', 'header', 'iconContainer'),    
    ...WebpackModules.getByProps('iconContainer', 'match', 'gameIconSize', 'icon'),
    ...WebpackModules.getByProps('resultFocused', 'content', 'note', 'badge')
}

export default function Result(props) {
    const [state, setState] = useState(classes.result);

    return (
        <div
        className={joinClassNames(state)}
        onMouseOver={() => setState([classes.result, classes.resultFocused])}
        onMouseLeave={() => setState(classes.result)}
        {...props}
        >
            <div className={joinClassNames(classes.contentDefault, classes.content)}>
                <div className={classes.iconContainer}>
                    {props.icon}
                </div>

                <div className={classes.name}>
                    <span className={classes.match}>{props.name}</span>
                    <span className={classes.note}>{props.info}</span>
                </div>

                <div className={classes.misc}>
                    <div className={classes.miscContainer}>{props.desc}</div>
                </div>
              </div>
        </div>
    )
}