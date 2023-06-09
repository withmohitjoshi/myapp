import axios from 'axios';
import './App.css';
import SingleDrop from './components/SingleDrop';
import { Controller, useForm } from 'react-hook-form';

const apiClient = axios.create({
  headers: {
    'x-auth-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkaWFsemVyLWp3dCIsInN1YiI6eyJ1dWlkIjoiMzczMmExYzktMzZhMC00MmM4LWIwNjUtZjk2ODRmNTVlNTY4IiwiZGJfbmFtZSI6ImdwazMxOTgxNjMxXzEiLCJwYXJlbnRfaWQiOm51bGwsImVtYWlsIjoicGFua2FqLnNpbmdoQGNhcGFuaWN1cy5jb20iLCJkb21haW4iOiJncGszMTk4MTYzMS5kaWFsemVyLmNvbSIsInVzZXJfZXh0ZW5zaW9uIjoiNDQ4MSIsImZpcnN0bmFtZSI6IlBhbmthaiIsImxhc3RuYW1lIjoiU2luZ2giLCJ0eXBlIjoiVSIsImNhbGxlcl9pZCI6IisxNzYwOTkxNTkwMyIsImlkIjoyMDIsInRpbWV6b25lIjoiSVNUIiwicGxhbl91dWlkIjoiOTgzMzU2YmYtYzVjOS00MWRlLWE4ZjYtN2YyYjE1OGIyN2ZmIn0sImlhdCI6MTY4NjI4OTM4OCwiZXhwIjoxNjkxNDczMzg4fQ.W1RyLU1iUA68k_nVSpfUjmk0CMz7WV6JSvoCvVQiGPk'
  }
})

export const list = (payload) => {
  return apiClient({
    baseURL: "https://tenant-api-dev.dialzer.com/api/",
    method: "POST",
    url: "phonebook/contact-list",
    data: payload
  })
}
function App() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      listName: "",
    }
  })

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit((data) => {
          console.log(data);
        })}>
          {/* <Controller
            name='listName'
            control={control}
            render={({ field }) => {
              return <SingleDrop
                queryFn={list}
                queryFnPayload={{
                  group_uuid
                    :
                    "FCC81696-6F03-4688-BD61-ADFDCA00BE99",
                }}
                queryKey='list'
                label='firstname'
                select='uuid'
                // controllerField={field}
                onChange={(value) => {
                  console.log(value);
                }}
              />
            }}
          /> */}
          <Controller
            name='username'
            control={control}
            render={({ field }) => {
              return <SingleDrop
                label='name'
                select='names'
                isApiPresent={false}
                rawDataForDropdown={[
                  { name: "mohit", id: 1 },
                  { name: "rohit", id: 2 },
                  { name: "neha", id: 3 },
                  { name: "kapil", id: 4 },
                ]}
                controllerField={field}
                onChange={(value) => {
                  console.log(value);
                }}
              />
            }}
          />

          {/* <button type='submit'>Submit</button> */}
        </form>
      </header>
    </div>
  );
}

export default App;
