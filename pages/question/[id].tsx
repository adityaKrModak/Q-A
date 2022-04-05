import React from "react";
import Comment from "../../components/Comment";
import FeedSkeleton from "../../components/FeedSkeleton";
import Layout from "../../components/Layout";

function QuestionDetails() {
  return (
    <Layout>
      <FeedSkeleton question="What is Projectile" likes={0} comments={0} />
      <Comment />
      <div>[id]</div>
    </Layout>
  );
}

export default QuestionDetails;
