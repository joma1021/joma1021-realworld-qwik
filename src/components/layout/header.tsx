import { component$, useContext } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { UserSessionStore } from "~/components/auth/auth-provider";
import { UserSessionContext } from "~/components/auth/auth-provider";

export default component$(() => {
  const userSession = useContext<UserSessionStore>(UserSessionContext);
  return (
    // TODO: active tab if clicked
    <nav class="navbar navbar-light">
      <div class="container">
        <Link class="navbar-brand" href="/">
          conduit
        </Link>
        {userSession.isLoggedIn ? (
          <ul class="nav navbar-nav pull-xs-right">
            <li class="nav-item">
              <Link class="nav-link active" href="/">
                Home
              </Link>
            </li>

            <li class="nav-item">
              <Link class="nav-link" href="/editor">
                <i class="ion-compose"></i>&nbsp;New Article{" "}
              </Link>
            </li>

            <li class="nav-item">
              <Link class="nav-link" href="/settings">
                {" "}
                <i class="ion-gear-a"></i>&nbsp;Settings{" "}
              </Link>
            </li>
            <li class="nav-item">
              {/* TODO: <Link> doesn't lead to a updated of userprofile / reload of page if switching between profiles even tough rout url updates. It may be a bug from qwik -> find solution*/}
              <a class="nav-link" href={`/profile/${userSession.user?.username}`}>
                <img width={25} height={25} src={userSession.user?.image} class="user-pic" />
                {userSession.user?.username}
              </a>
            </li>
          </ul>
        ) : (
          <ul class="nav navbar-nav pull-xs-right">
            <li class="nav-item">
              <Link class="nav-link " href="/">
                Home
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link " href="/login">
                Sign In
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link " href="/register">
                Sign Up
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
});
