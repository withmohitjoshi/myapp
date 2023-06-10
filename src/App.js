import axios from "axios";
import "./App.css";
import SingleDrop from "./components/SingleDrop";
import { Controller, useForm } from "react-hook-form";

const apiClient = axios.create({
  headers: {
    "x-auth-token":
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkaWFsemVyLWp3dCIsInN1YiI6eyJ1dWlkIjoiMzczMmExYzktMzZhMC00MmM4LWIwNjUtZjk2ODRmNTVlNTY4IiwiZGJfbmFtZSI6ImdwazMxOTgxNjMxXzEiLCJwYXJlbnRfaWQiOm51bGwsImVtYWlsIjoicGFua2FqLnNpbmdoQGNhcGFuaWN1cy5jb20iLCJkb21haW4iOiJncGszMTk4MTYzMS5kaWFsemVyLmNvbSIsInVzZXJfZXh0ZW5zaW9uIjoiNDQ4MSIsImZpcnN0bmFtZSI6IlBhbmthaiIsImxhc3RuYW1lIjoiU2luZ2giLCJ0eXBlIjoiVSIsImNhbGxlcl9pZCI6IisxNzYwOTkxNTkwMyIsImlkIjoyMDIsInRpbWV6b25lIjoiSVNUIiwicGxhbl91dWlkIjoiOTgzMzU2YmYtYzVjOS00MWRlLWE4ZjYtN2YyYjE1OGIyN2ZmIn0sImlhdCI6MTY4NjI4OTM4OCwiZXhwIjoxNjkxNDczMzg4fQ.W1RyLU1iUA68k_nVSpfUjmk0CMz7WV6JSvoCvVQiGPk",
  },
});

export const list = (payload) => {
  return apiClient({
    baseURL: "https://tenant-api-dev.dialzer.com/api/",
    method: "POST",
    url: "phonebook/contact-list",
    data: payload,
  });
};
function App() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      listName: "",
    },
  });

  return (
    <div className="App">
      <header className="App-header">
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
        >
          <Controller
            name="username"
            control={control}
            render={({ field }) => {
              return (
                <SingleDrop
                  fieldName="username"
                  initalValue="15"
                  isApiPresent={false}
                  onChange={(value) => console.log(value)}
                  displayLabel="name"
                  selectedValue="id"
                  placeholder="select username"
                  formHookField={field}
                  rawData={[
                    { name: "mohit", id: 12 },
                    { name: "rohit", id: 13 },
                    { name: "tohit", id: 14 },
                    { name: "lohit", id: 15 },
                  ]}
                />
              );
            }}
          />
          <button type="submit">Submit</button>
        </form>
      </header>
    </div>
  );
}

export default App;
