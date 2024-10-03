export default function InputGroup({ ...props }) {
  return (
    <div className="flex flex-col w-full" {...props}>
      {props.children}
    </div>
  );
}
