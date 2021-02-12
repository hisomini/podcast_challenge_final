import {
  faEdit,
  faPlus,
  faPlusCircle,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useMe } from "../hooks/useMe";

interface IFormProps {
  searchTerm: string;
}

export const Header: React.FC = () => {
  const { data } = useMe();
  const { register, handleSubmit, getValues } = useForm<IFormProps>();
  const history = useHistory();
  const onSearchSubmit = () => {
    const { searchTerm } = getValues();
    history.push({
      pathname: "/search",
      search: `?term=${searchTerm}`,
    });
  };
  if (data?.me.role === "Host") {
    return (
      <header className="py-4 ">
        <div className="w-full px-5 xl:px-0 mx-auto max-w-screen-xl flex justify-between">
          <h1 className="text-indigo-500 text-xl font-bold p-1 mx-6">
            <Link to="/">Ari-Podcasts</Link>
          </h1>

          <span className="flex justify-between items-center mx-6  ">
            <Link to="/new_podcast">
              <FontAwesomeIcon
                icon={faPlusCircle}
                className="text-3xl text-indigo-400 mr-6 mt-1"
              />
            </Link>
            <Link
              className="hover:underline flex mr-4 text-indigo-800"
              to="/edit-profile"
            >
              <FontAwesomeIcon
                icon={faEdit}
                className="text-2xl text-indigo-400 mr-1 "
              />
              {data?.me.email}
            </Link>
            <Link to="/logout" className="">
              <FontAwesomeIcon
                icon={faSignOutAlt}
                className="text-2xl text-indigo-400 "
              />
            </Link>
          </span>
        </div>
      </header>
    );
  }

  return (
    <header className="py-4">
      <div className="w-full px-5 xl:px-0 mx-auto max-w-screen-xl flex justify-between">
        <h1 className="text-indigo-500 text-xl font-bold p-1">
          <Link to="/">Ari-Podcasts</Link>
        </h1>

        <div className="hidden md:block w-1/2">
          <form onSubmit={handleSubmit(onSearchSubmit)}>
            <input
              ref={register({ required: true, min: 3 })}
              name="searchTerm"
              type="Search"
              className="w-3/4  focus:outline-none border-2 border-indigo-300 p-1 rounded-md"
              placeholder="Search Podcasts..."
            />
          </form>
        </div>
        <span className="flex justify-between items-center">
          <Link
            className="hover:underline flex mr-4 text-indigo-800"
            to="/edit-profile"
          >
            <FontAwesomeIcon
              icon={faEdit}
              className="text-2xl text-indigo-400 mr-1 "
            />
            {data?.me.email}
          </Link>
          <Link to="/logout" className="">
            <FontAwesomeIcon
              icon={faSignOutAlt}
              className="text-2xl text-indigo-400 "
            />
          </Link>
        </span>
      </div>
    </header>
  );
};
