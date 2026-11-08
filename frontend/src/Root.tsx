import { useState, useEffect, useCallback } from 'react';
import App from './App';
import { topics, getTopic, DEFAULT_TOPIC_ID } from './topics';

/** The topic for a URL path: the first path segment, or the default topic. */
function topicIdFromPath(pathname: string): string {
  const first = pathname.split('/').filter(Boolean)[0];
  return getTopic(first) ? first : DEFAULT_TOPIC_ID;
}

/**
 * Routes by topic: /uscivilwar, /<other-topic>, ... "/" and unknown paths go
 * to the default topic. Query params (?event=...) are handled inside App.
 */
export default function Root() {
  const [topicId, setTopicId] = useState(() => topicIdFromPath(window.location.pathname));

  // Canonicalize the path, e.g. "/" -> "/uscivilwar", keeping the query string
  useEffect(() => {
    const first = window.location.pathname.split('/').filter(Boolean)[0];
    if (first !== topicId) {
      window.history.replaceState(null, '', `/${topicId}${window.location.search}`);
    }
  }, [topicId]);

  // Browser back/forward between topics
  useEffect(() => {
    const onPopState = () => setTopicId(topicIdFromPath(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const changeTopic = useCallback((id: string) => {
    window.history.pushState(null, '', `/${id}`);
    setTopicId(id);
  }, []);

  const topic = getTopic(topicId) ?? topics[0];
  // key remounts App so all per-topic state starts fresh
  return <App key={topic.id} topic={topic} topics={topics} onTopicChange={changeTopic} />;
}
