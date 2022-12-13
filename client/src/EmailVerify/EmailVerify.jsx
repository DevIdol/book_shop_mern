import React, { useState, useEffect, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./EmailVerify.module.css";
import Loading from "../Loading/Loading";
import axios from "axios";
import { url } from "../Redux/Api";
const EmailVerify = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const param = useParams();
  useEffect(() => {
    setLoading(true);
    const verifyEmailUrl = async () => {
      try {
        const { data } = await axios.get(
          `${url}/users/${param.id}/verify/${param.token}`
        );
        data.message && navigate("/login");
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setLoading(false);
          setError(error.response.data.message);
          setMsg("");
        }
      }
    };
    verifyEmailUrl();
  }, [param, navigate, msg]);
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          {
            <div className={classes.container}>
              {error && <h1>404 | {error}</h1>}
            </div>
          }

        </Fragment>
      )}
    </Fragment>
  );
};

export default EmailVerify;
