import React, { useState, useEffect } from 'react';
import './App.css';
import Search from './components/Search/Search';
import MoreInfo from './components/MoreInfo/MoreInfo';
import List from './components/List/List';
import octokit from './api/apiSetup';

function App() {
  const [ followedRepos, setFollowedRepos ] = useState([]);
  const [ selectedRepo, setSelectedRepo ] = useState({repo: null, owner: null})

  useEffect(() => {
    const persistedRepos = localStorage.getItem('followedRepos');
    if (!persistedRepos) {
      console.log('no repos found')
    } else {
      const parsedRepos = JSON.parse(persistedRepos);

      parsedRepos.forEach(repository => {
        const { owner, repo, release, seen } = repository;
        octokit.request('GET /repos/{owner}/{repo}/releases/latest', {
            owner: owner,
            repo: repo
        }).then(result => {
            if (result.status !== 404) {
                let data = {owner, repo, release: result.data.name, update: result.data.published_at}
                if (data.release !== release || seen === false) {
                  setFollowedRepos(prev => [{...data, seen: false}, ...prev])
                } else {
                  setFollowedRepos(prev => [...prev, {...data, seen: true}])
                }
            } else { throw Error("No Release Information for this repository")}
        }).catch(err => {
            console.log(err)
            throw Error("No Release Information for this repository")
        })
    })
    }

  },[])

  const handleMarkSeen = (repo) => {
    let update = [...followedRepos];
    for (let r of update) {
      if (r.repo === repo) {
        r.seen = true;
        break;
      }
    }
    update = [...update.filter(_ => _.seen === false), ...update.filter(_ => _.seen === true)]

    localStorage.setItem('followedRepos', JSON.stringify(update));
    setFollowedRepos(update);
  }

  const handleAddRepo = (owner, repo) => {
    octokit.request('GET /repos/{owner}/{repo}/releases/latest',{
      owner: owner,
      repo: repo
    }).then(res => {
      let data = {
        repo: repo,
        owner: owner,
        release: res.data.name,
        update: res.data.published_at,
        seen: false
      };
      let update = [data,...followedRepos];
      console.log(update)
      localStorage.setItem('followedRepos', JSON.stringify(update));
      setFollowedRepos(update);
    }).catch(err => console.log(err))
  }

  const handleSelectRepo = (owner, repo) => {
    setSelectedRepo({owner, repo});
  }

  return (
    <div className="App">
      <Search onAddRepo={handleAddRepo}/>
      <div className="body">
        <List 
          followedRepos={followedRepos} 
          handleMarkSeen={handleMarkSeen}
          handleSelectRepo={handleSelectRepo}/>
        <MoreInfo 
          owner={selectedRepo.owner} 
          repo={selectedRepo.repo}/>
      </div>
    </div>
  );
}

export default App;
