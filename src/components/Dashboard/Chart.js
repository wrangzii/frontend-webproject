import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Cookies } from 'react-cookie'
import { CSVLink } from 'react-csv'
import ReactApexChart from 'react-apexcharts'

function Chart() {
    const cookies = new Cookies()
    const [data, setData] = useState([])
    const [countIdea, setCountIdea] = useState([])
    const [countCate, setCountCate] = useState([])
    const [ideas, setIdeas] = useState([])
    const [isAdmin, setIsAdmin] = useState(false)
    const [mounted, setMounted] = useState(true)
    const myHeaders = {
        'Authorization': 'Bearer ' + cookies.get('token')
    }

    useEffect(() => {
        if (cookies.get("token")) {
            if (cookies.get("roles").some(role => role === "ROLE_ADMIN")) {
                setIsAdmin(true)
            } else {
                setIsAdmin(false)
                // navigate("/")
            }
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
            .then(response => {
                setIdeas(response.data)
                console.log(response);
            })
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
            .then(response => setData(response.data))
            .catch(error => console.log({ error }))
    }, [])

    const csvReport = {
        filename: `Report_${new Date().toLocaleDateString()}.csv`,
        data: data
    }

    return (
        <div className='chart d-flex flex-column gap-5'>
            <div className="pie-chart">
                <h4 className='text-uppercase'>The percentage of ideas by department</h4>
                <ReactApexChart options={pie.options} series={pie.series} type="pie" width={380} />
            </div>
            <div className="bar-chart">
                <h4 className='text-uppercase'>Idea's view by category</h4>
                <ReactApexChart options={bar.options} series={bar.series} type="bar" height={350} />
            </div>
            <div className="table-ideas">
                <h3 className='text-uppercase'>Ideas statistical analysis</h3>
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
                                    <td>{idea.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="export-csv w-100">
                <CSVLink {...csvReport} className='btn btn-success'>
                    <i className="fa-solid fa-download mr-2"></i>
                    Export CSV File
                </CSVLink>
            </div>
        </div>
    )
}

export default Chart