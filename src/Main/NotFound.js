import React from 'react';
import './notfound.css'
const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-heading">404 - Page Not Found</h1>
      <img className="not-found-image" src="https://previews.123rf.com/images/pavlostv/pavlostv1805/pavlostv180500401/101741080-oops-404-error-page-not-found-futuristic-robot-concept-%E2%80%93-vector.jpg" alt="404" />
      {/* Additional content for the 404 page */}
    </div>
  );
};

export default NotFound;
