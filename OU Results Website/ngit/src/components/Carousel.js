import {Fragment, useState, useRef} from "react";
import '../App.css';

const Carousel = (props) => {

    const [update, setUpdate] = useState(0);

    var mainInfo = useRef({});
    var mainInfo1 = useRef({});
    var roll = useRef("");

    const view = () => {
        document.getElementById("load").style.display = "none"
        document.getElementById("info").style.display = "block";
    }
    
    const data = async () => {
        try {
            var info = await fetch(`https://ngit-results.onrender.com/${props.year}/${props.roll}`);
            mainInfo.current = await info.json();
            var info1 = await fetch(`https://ngit-results.onrender.com/history/${props.year}/${props.roll}`);
            mainInfo1.current = await info1.json();
            props.render.current = 1;
            setUpdate(update+1);
        } catch (err) {
            console.log(err);            
        }
    }

    if(roll.current !== props.roll){
        roll.current = props.roll;
        data();
    }
    
    const mainBar = {
        fontSize: "17px",
        marginBottom: "0px",
        zIndex: "1",
        position: "relative",
        minHeigt: "100px"
    }
    var count = 0;

    if(update !== 0 && props.render.current === 1){
        return (
            <Fragment key={props.roll}>
                    <table className="table table-info table-striped table-sm" style={mainBar}>
                        <thead className="text-center">
                            <tr>
                                <th colSpan={4} style={{fontSize: "18px"}}>Personal Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Hall Tickect No. :</th>
                                <td>{mainInfo.current[0][0].rollnumber}</td>
                                <th>Gender :</th>
                                <td>{mainInfo.current[0][0].gender === 1 ? 'Male':'Female'}</td>
                            </tr>
                            <tr>
                                <th scope="row">Name :</th>
                                <td>{mainInfo.current[0][0].name}</td>
                                <th>Father's Name :</th>
                                <td>{mainInfo.current[0][0].fathersname}</td>
                            </tr>
                            <tr>
                            <th scope="row">Course :</th>
                            <td>BE(CBCS)</td>
                            <th>Medium :</th>
                            <td>English</td>
                            </tr>
                        </tbody>
                    </table>
                <div style={{overflow: "hidden", display: "flex"}}>
                    <div id="carouselExampleDark1" className="carousel carousel-dark slide checkLeft" data-interval="false" style={{minWidth: "100%", transition: "0.75s"}}>
                        <div className="carousel-indicators">
                            {
                                mainInfo.current[mainInfo.current.length-1].map((curr, i) => {
                                    if(i === 0) return <button type='button' data-bs-target='#carouselExampleDark1' data-bs-slide-to={i} className='active' aria-current='true' aria-label={'Slide '+(i+1)} />
                                    else return <button type='button' data-bs-target='#carouselExampleDark1' data-bs-slide-to={i} aria-label={'Slide '+(i+1)} />
                                })
                            }
                        </div>
                        <div className="carousel-inner">
                            {
                                mainInfo.current[1].map((SEM, i) => {
                                        return (
                                            <div className={"carousel-item "+ (i === 0 ? 'active': '')} data-bs-interval="0">
                                                <div style={{maxHeight: "450px", overflow: "auto", maxWidth: "77%", margin: "20px auto"}}>
                                                <table className="table table-info table-striped" style={{marginBottom: '0px'}}>
                                                    <thead className="text-center">
                                                        <tr>
                                                        <th scope="col">Sub Code</th>
                                                        <th scope="col">Subject Name</th>
                                                        <th scope="col">Credits</th>
                                                        <th scope="col">Grade Points</th>
                                                        <th scope="col">Grade Secured</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="text-center">
                                                        {
                                                            SEM.map(sub => {
                                                                return (
                                                                    <tr>
                                                                        <th scope="row">{sub.subjectcode}</th>
                                                                        <td>{sub.subjectname}</td>
                                                                        <td>{sub.credits}</td>
                                                                        <td>{sub.gradepoints}</td>
                                                                        <td>{sub.gradesecured}</td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                                </div>
                                                <div className="carousel-caption d-md-block" style={{paddingTop: "0px", paddingBottom:"20px", bottom: "1em"}}>
                                                    <h5>Semester - {SEM[0].subjectcode[0]} ({mainInfo.current[mainInfo.current.length-1][count].date})</h5>
                                                    <p style={{marginBottom: '0'}}><b>Result : {mainInfo.current[mainInfo.current.length-1][count++].result}</b></p>
                                                </div>
                                            </div>
                                            
                                        )
                                })
                            }
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark1" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark1" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                    <div id="carouselExampleDark2" className="carousel carousel-dark slide" data-interval="false" style={{minWidth: "100%"}}>
                        <div className="carousel-indicators">
                            {
                                mainInfo1.current[0].map((curr, i) => {
                                    if(i === 0) return <button type='button' data-bs-target='#carouselExampleDark2' data-bs-slide-to={i} className='active' aria-current='true' aria-label={'Slide '+(i+1)} />
                                    else return <button type='button' data-bs-target='#carouselExampleDark2' data-bs-slide-to={i} aria-label={'Slide '+(i+1)} />
                                })
                            }
                        </div>
                        <div className="carousel-inner">
                            {
                                mainInfo1.current[0].map((SEM, i) => {
                                        return (
                                            <div className={"carousel-item "+ (i === 0 ? 'active': '')} data-bs-interval="0">
                                                <div style={{maxHeight: "450px", overflow: "auto", maxWidth: "77%", margin: "20px auto"}}>
                                                <table className="table table-info table-striped" style={{marginBottom: "0px"}}>
                                                    <thead className="text-center">
                                                        <tr>
                                                        <th scope="col">Sub Code</th>
                                                        <th scope="col">Subject Name</th>
                                                        <th scope="col">Credits</th>
                                                        <th scope="col">Grade Points</th>
                                                        <th scope="col">Grade Secured</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="text-center">
                                                        {
                                                            SEM.map(sub => {
                                                                return (
                                                                    <tr>
                                                                        <th scope="row">{sub.subjectcode}</th>
                                                                        <td>{sub.subjectname}</td>
                                                                        <td>{sub.credits}</td>
                                                                        <td>{sub.gradepoints}</td>
                                                                        <td>{sub.gradesecured}</td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                                </div>
                                                <div className="carousel-caption d-md-block" style={{paddingTop: "0px", paddingBottom:"20px", bottom: "1em"}}>
                                                    <h5>{mainInfo1.current[1][i][0].attempt === 0 ? 'Re-Evaluation' : 'Regular'} ({mainInfo1.current[1][i][0].date})</h5>
                                                    <p style={{marginBottom: '0'}}><b>{mainInfo1.current[1][i].map(sem => {return '| Sem '+sem.semester+' : '+sem.result+' '})}|</b></p>
                                                </div>
                                            </div>
                                            
                                        )
                                })
                            }
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark2" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark2" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                {view()}
            </Fragment>
        );
    };
}

export default Carousel;