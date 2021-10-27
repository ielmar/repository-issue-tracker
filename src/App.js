import { useState, useEffect } from "react";
import Table from "./Table";
import Line from "./Line";
import "./App.css";

export default function App() {
  const [repo, setRepo] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [openIssues, setOpenIssues] = useState([]);
  const [closedIssues, setClosedIssues] = useState([]);

  const LoadIssuesData = () => {
    // get open issues
    fetch(
      `https://api.github.com/repos/${repo}/issues?per_page=50&page=${pageNo}&state=open`
    )
      .then((res) => res.json())
      .then((issues) => {
        console.log(issues)
        if (issues.message === "Not Found") setIsEmpty(true);
        else {
          const previousOpenIssues = openIssues;
          setOpenIssues(previousOpenIssues.concat(issues));
        }
      });

    // get closed issues
    fetch(
      `https://api.github.com/repos/${repo}/issues?per_page=50&page=${pageNo}&state=closed`
    )
      .then((res) => res.json())
      .then((issues) => {
        if (issues.message === "Not Found") setIsEmpty(true);
        else {
          const previousClosedIssues = closedIssues;
          setClosedIssues(previousClosedIssues.concat(issues));
        }
      });
  };

  const getRepositoryData = (e) => {
    e.preventDefault();

    if (repo.length === 0) setIsEmpty(true);
    else {
      setLoading(true);

      LoadIssuesData();
    }
  };

  useEffect(() => {
    if (pageNo > 1) LoadIssuesData();
  }, [pageNo]);

  return (
    <div className="App">
      {openIssues.length === 0 || closedIssues.length === 0 ? (
        <form onSubmit={(e) => getRepositoryData(e)}>
          <label htmlFor="repo_link">
            <p>Enter the repository link to get open and closed issues</p>
            <input
              name="repo_link"
              type="text"
              onChange={(e) => setRepo(e.target.value)}
              placeholder="Enter repository link"
            />
            <button type="submit">Get the issues</button>
          </label>
          {isEmpty && <p>No repository or wrong repository entered</p>}
        </form>
      ) : (
        <>
          <Table openIssues={openIssues} closedIssues={closedIssues} />
          <Line openIssues={openIssues} closedIssues={closedIssues} />
          <button className="load_more" onClick={() => setPageNo(pageNo + 1)}>
            Load more
          </button>
        </>
      )}
    </div>
  );
}
