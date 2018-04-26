import React from 'react'

const FeaturedDevelopers = ({ users }) => (
  <section className="section section--dark ">
    <h3 className="section__header ">Featured Developers</h3>
    <p className="section__text">
      These developers joined a team who lost a member and helped them finish
      their project.
    </p>
    <div className="section__users">
      {users
        ? users
            .slice(0, 24)
            .map(user => (
              <img
                className="section__users__image"
                src={
                  user.avatar_url ||
                  'https://visualpharm.com/assets/336/User-595b40b65ba036ed117d26d4.svg'
                }
                key={user.id}
                alt={`${user.first_name} ${user.last_name}`}
              />
            ))
        : 'Loading'}
    </div>
  </section>
)

export default FeaturedDevelopers
