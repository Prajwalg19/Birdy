
type propType = {
    handleBlur: any;
    handleChange: any;
    value: string;
    placeholder: string;
    name: string;
    type: string;
    errors: string | undefined;
    touched: boolean | undefined;
}
export default function InputField(arg: {props: propType}) {
    const {handleBlur, handleChange, value, placeholder, name, type, errors, touched} = arg.props
    return (
        <div className="h-11 w-full">

            <input type={type} name={name} value={value} onBlur={handleBlur} placeholder={placeholder} onChange={handleChange} className="rounded-md px-2 py-1 border border-blue-800/30 w-full mb-1" />
            {touched && errors ? (<div className="text-red-500 text-xs">{errors}</div>) : null}

        </div>
    )

}
