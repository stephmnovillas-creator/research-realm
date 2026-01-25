type Props = {
  role: "admin" | "user";
};

const UserRoles = ({ role }: Props) => {
  return (
    <p>
      Logged in as: <strong>{role.toUpperCase()}</strong>
    </p>
  );
};

export default UserRoles;
