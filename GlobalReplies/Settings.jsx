import { FormItem, FormNotice } from "@discord/forms";
import { Button, TextInput } from "@discord/components";
import { useState } from "react"
const {
    getData,
	setData,
} = BdApi;


function getTemplate() {
    return getData("GlobalReplies", "template") ?? `Replying to {{author}} {{messageLink}} `
}

function Variable(props) {
    return(
        <p>
            <strong>{props.title}</strong> <span> — </span> <span>{props.desc}</span>
        </p>
    )
}

export default function Settings() {
    const [state, setState] = useState(getTemplate());

    return (
    [
        <FormItem title="Global reply template">
			<TextInput 
			value={state}
			onChange={e => {
                setState(e);
				setData("GlobalReplies", "template", e)
			}}/>
        <Button look="lookLink-15mFoz" onClick={() => {
            setState(`Replying to {{author}} {{messageLink}} `);
            setData("GlobalReplies", "template", `Replying to {{author}} {{messageLink}} `)
        }}>
        Reset 
        </Button>	
        </FormItem>,

        <FormNotice
        title="Variables"
        type="cardWarningOutline" body={[
            <p></p>,
            <Variable title="{{author}}" desc="Being replaced with the author mention"/>,
            <Variable title="{{authorTag}}" desc="Being replaced with the author tag (User#0000)"/>,
            <Variable title="{{messageLink}}" desc="Being replaced with the replied message link"/>,
            <Variable title="{{channel}}" desc="Being replaced with the channel of the replied message"/>,
            <Variable title="{{message}}" desc="Will be replaced with the user message"/>,
            <Variable title="{{messageShort}}" desc="Will be replaced with the first 50 characters of user message"/>,
            <Variable title="{{newLine}}" desc="Switching to a new line"/>
        ]}>

        </FormNotice>
    ]
    )
}