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
        <div className="h-20 gap-1 w-full flex flex-col justify-center">

            <input type={type} name={name} value={value} onBlur={handleBlur} placeholder={placeholder} onChange={handleChange} className="rounded-md border-gray-50 px-4 dark:bg-slate-700 dark:border-slate-500 text-black dark:text-gray-300 py-3  border border-blue-800/30 w-full mb-1" />
            <div className="h-5">
                {touched && errors ? (<div className="text-red-500 text-xs">{errors}</div>) : null}

            </div>

        </div>
    )

}
