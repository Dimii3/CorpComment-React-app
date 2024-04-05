type message = {
  msg: string;
};

export default function ErrorMsg({ msg }: message) {
  return <div>{msg}</div>;
}
