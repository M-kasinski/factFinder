export interface YouTubeThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface YouTubeThumbnails {
  default: YouTubeThumbnail;
  medium: YouTubeThumbnail;
  high: YouTubeThumbnail;
  standard?: YouTubeThumbnail;
  maxres?: YouTubeThumbnail;
}

export interface YouTubeVideoItem {
  id: string;
  title: string;
  description: string;
  channelTitle: string;
  publishedAt: string;
  thumbnails: YouTubeThumbnails;
  // Ces champs peuvent être ajoutés plus tard si on implémente getVideoDetails
  viewCount?: string;
  likeCount?: string;
  duration?: string;
}

// Structure de la réponse de l'API YouTube
export interface YouTubeSearchResponse {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  regionCode?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: Array<{
    kind: string;
    etag: string;
    id: {
      kind: string;
      videoId?: string;
      channelId?: string;
      playlistId?: string;
    };
    snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: YouTubeThumbnails;
      channelTitle: string;
      liveBroadcastContent: string;
      publishTime: string;
    };
  }>;
}
