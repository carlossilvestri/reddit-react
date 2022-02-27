import React, { useEffect, useState } from "react";
import { LoadingComponent, PostComponent, SearchBarComponent } from "..";
import api from "../../../shared/api/api";
import { Child, LoadingOnSearchPage, Reddit } from "../../interfaces";
import { ErrorMsgComponent } from "../error/ErrorMsgComponent";
import "./search-component.scss";

export const SearchComponent = () => {
  const [searchByName, setSearchByName] = useState<string>("news");
  const [loadingOnSearchObj, seLoadingOnSearchObj] =
    useState<LoadingOnSearchPage>({
      isLoading: false,
      error: false,
    });
  const [childReddit, setChildReddit] = useState<Child[]>([]);

  const handleSearchByAccountName = (e: any) => {
    const texto = e.current.value;
    setSearchByName(texto);
  };
  useEffect(() => {
    const getPosts = async (filterWord: string) => {
      try {
        // Update state on loading...
        let loadingObj: LoadingOnSearchPage = {
          isLoading: true,
          error: false,
        };
        seLoadingOnSearchObj(loadingObj);
        const resp = await api.get<Reddit>(`/r/${filterWord}.json`);
        console.log("resp.data ", resp.data);
        const childrenOfRedditData: Child[] = resp.data.data.children;
        setChildReddit(childrenOfRedditData);
        // Update state on loading...
        loadingObj = {
          isLoading: false,
          error: false,
        };
        seLoadingOnSearchObj(loadingObj);
      } catch (error) {
        console.log("error ", error);
        setChildReddit([]);
        // Update state on loading...
        let loadingObj: LoadingOnSearchPage = {
          isLoading: false,
          error: true,
        };
        seLoadingOnSearchObj(loadingObj);
      }
    };
    getPosts(searchByName);
  }, [searchByName]);

  return (
    <>
      <div className="container">
        <SearchBarComponent
          placeholder={"Buscar por nombre..."}
          handleSearch={handleSearchByAccountName}
        />
        <div className="container">
          <div className="row">
            {childReddit.length > 0 &&
              childReddit.map((child, index) => (
                <PostComponent
                  key={`key-post-component-${index}`}
                  kind={child.kind}
                  data={child.data}
                />
              ))}
            {loadingOnSearchObj.isLoading && <LoadingComponent />}
            {loadingOnSearchObj.error && (
              <ErrorMsgComponent msg={"Hubo un error..."} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
