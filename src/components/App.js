import React from 'react';
import SearchBar from './SearchBar';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

class App extends React.Component {
    state = {
        videos: [],
        selectedVideo: null
    }
    key = 'AIzaSyATT_KL4azAimOYNVVbkdvZwxss7F5BNWI';
    onTermSubmit = async (term) => {
        let response = await fetch('https://www.googleapis.com/youtube/v3/search?' + new URLSearchParams({
            part: 'snippet',
            q: term,
            key: this.key,
            maxResults: 5,
            type: 'video'
        }))
        let json = await response.json();
        this.setState({
            videos: json.items,
            selectedVideo: json.items[0]
        });
    }

    componentDidMount(){
        this.onTermSubmit('pop smoke');
    }
    
    onVideoSelect = (video) => {
        this.setState({
            selectedVideo: video
        
        });

    }

    render () {
        return (
            <div className="ui ">
                <SearchBar onFormSubmit={this.onTermSubmit} />
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail video={this.state.selectedVideo} />
                        </div>
                        <div className="five wide column">
                            <VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos}/>
                        </div>
                        
                    </div>
                    
                </div>
                
            </div>
        )
    }
}

export default App;