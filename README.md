<div className="modal-conatainer">
            <div className="grid-item-1 grid-item">1</div>
            <div className="grid-item-2 grid-item">
              <img width="100%" height="100%" src={tallPic} />
            </div>
            <div className="grid-item-3 grid-item">
              <p>الاسم:{"احمد الشمري"}</p>
            </div>
            <div className="grid-item-4 grid-item">
              <h4 id="header-name">العمر</h4>
              <h4 id="sub-info">43</h4>
              <h4 id="header-name">الطول</h4>
              <h4 id="sub-info">173cm</h4>
              <h4 id="header-name">الوزن</h4>
              <h4 id="sub-info">73kg</h4>
            </div>
            <div className="grid-item-5 grid-item">
              <img width="100%" height="100%" src={pic1}></img>
            </div>
            <div className="grid-item-6 grid-item">
              <img width="100%" height="100%" src={pic2}></img>
            </div>
            <div className="grid-item-7 grid-item">
              <img width="100%" height="100%" src={pic3}></img>
            </div>
            <div className="grid-item-8 grid-item">
              <img width="100%" height="100%" src={pic4}></img>
            </div>
            <div className="grid-item-9 grid-item">
              {console.log(
                `${
                  process.env.REACT_APP_SERVER_URL
                }public/${user.videoName?.replace(/ /g, "%20")}`
              )}
              {user.videoName && (
                <video width="100%" height="100%" controls>
                  <source
                    src={
                      user.videoName
                        ? `${
                            process.env.REACT_APP_SERVER_URL
                          }public/${user.videoName?.replace(/ /g, "%20")}`
                        : ""
                    }
                    type="video/mp4"
                  />
                </video>
              )}
              {!user.videoName && <h1>no video</h1>}
            </div>
          </div>
