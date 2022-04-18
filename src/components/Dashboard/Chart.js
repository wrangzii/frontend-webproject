import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Cookies } from 'react-cookie'
import { CSVLink } from 'react-csv'
import ReactApexChart from 'react-apexcharts'
import JSZip from 'jszip';
import FileSaver from 'file-saver'

function Chart() {
    const cookies = new Cookies()
    const [data, setData] = useState([])
    const [countIdea, setCountIdea] = useState([])
    const [countCate, setCountCate] = useState([])
    const [ideas, setIdeas] = useState([])
    const [isAdmin, setIsAdmin] = useState(false)
    const [isCoordinator, setIsCoordinator] = useState(false)
    const [isManager, setIsManager] = useState(false)
    const [mounted, setMounted] = useState(true)
    const myHeaders = {
        'Authorization': 'Bearer ' + cookies.get('token')
    }

    // Check role
    useEffect(() => {
        if (cookies.get("token")) {
            if (cookies.get("roles").some(role => role === "ROLE_ADMIN")) {
                setIsAdmin(true)
            } else {
                setIsAdmin(false)
            }
        }

        if (cookies.get("roles").some(role => role === "ROLE_QA_COORDINATOR")) {
            setIsCoordinator(true)
        } else {
            setIsCoordinator(false)
        }

        if (cookies.get("roles").some(role => role === "ROLE_QA_MANAGER")) {
            setIsManager(true)
        } else {
            setIsManager(false)
        }
        return () => setMounted(false)
    }, [mounted])

    // Get idea data chart
    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:8080/dashboard/idea",
            headers: myHeaders
        })
            .then(response => {
                setCountIdea(response.data)
            })
    }, [])

    // Get category data chart
    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:8080/dashboard/category",
            headers: myHeaders
        })
            .then(response => {
                setCountCate(response.data)
            })
    }, [])

    // Report idea by overall
    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:8080/dashboard/report/object",
            headers: myHeaders
        })
            .then(response => setIdeas(response.data))
    }, [])

    const pie = {
        series: countIdea.map(serie => serie.count),
        options: {
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: countIdea.map(label => label.department),
            responsive: [{
                breakpoint: 600,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },
    }

    const bar = {
        series: [{
            data: countCate.map(data => data.count)
        }],
        options: {
            chart: {
                type: 'bar'
            },
            xaxis: {
                categories: countCate.map(data => data.cateName)
            }
        },
    }

    // Export CSV
    useEffect(() => {
        axios({
            method: "GET",
            headers: myHeaders,
            url: 'http://localhost:8080/dashboard/report'
        })
            .then(response => {
                setData(response.data)
            })
            .catch(error => console.log({ error }))
    }, [])

    const csvReport = {
        filename: `Report_${new Date().toLocaleDateString()}.csv`,
        data: data
    }

    const downloadCSV = () => {
        const zip = new JSZip();
        zip.file(`Report.csv`, data);
        zip.generateAsync({ type: 'blob' }).then(function (content) {
            FileSaver.saveAs(content, `Report_${new Date().toLocaleDateString()}.zip`);
        });
    }

    if (isCoordinator || isAdmin || isManager) {
        return (
            <div className='chart d-flex flex-column gap-5'>
                <div className="pie-chart">
                    <h4 className='text-uppercase'>1. The percentage of ideas by department</h4>
                    <ReactApexChart options={pie.options} series={pie.series} type="pie" width={380} />
                </div>
                <div className="bar-chart">
                    <h4 className='text-uppercase'>2. Idea's view by category</h4>
                    <ReactApexChart options={bar.options} series={bar.series} type="bar" height={350} />
                </div>
                <div className="table-ideas">
                    <h3 className='text-uppercase'>3. Ideas statistical analysis</h3>
                    <div className="overflow-auto">
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Is Anonymous</th>
                                    <th scope="col">Idea Title</th>
                                    <th scope="col">Submission</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Total comments</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ideas.map((idea, index) => (
                                    <tr key={index}>
                                        <td className='pe-none'><input type="checkbox" defaultChecked={idea.isAnonymous} /></td>
                                        <td>{idea.title}</td>
                                        <td>{idea.submission}</td>
                                        <td>{idea.category}</td>
                                        <td className='d-table-cell text-center'>{idea.count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="form-group d-flex justify-content-end gap-3 flex-wrap">
                    <CSVLink {...csvReport} className='btn btn-success col-12 col-sm-auto'>
                        <i className="fa-solid fa-download mr-2"></i>
                        Export CSV File
                    </CSVLink>
                    <button className="btn btn-warning col-12 col-sm-auto" onClick={downloadCSV}>
                        <i className="fa-solid fa-download mr-2"></i>
                        Export as ZIP File
                    </button>
                </div>
            </div>
        )
    }
    return (
        <p className="alert alert-danger">You don't have permission to access this resources!</p>
    )
}

export default Chart