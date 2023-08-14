export default function Select({ label, value, onChange, options = [] }) {
  return (
    <div className="relative">
      <p className="pt-0 pr-2 pb-0 pl-2 absolute -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 bg-white">
        {label}
      </p>
      <select
        className="border placeholder-gray-400 focus:outline-none w-full p-4 m-0 text-base block bg-white rounded-md"
        value={value}
        onChange={onChange}
      >
        <option id="" value="">
          Select
        </option>
        {options && options.length
          ? options.map((item) => (
              <option id={item.id} key={item.id} value={item.id}>
                {item.label}
              </option>
            ))
          : null}
      </select>
    </div>
  );
}
