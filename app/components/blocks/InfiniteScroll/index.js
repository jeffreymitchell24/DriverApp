import React, { Component } from 'react'
import { FlatList } from 'react-native'
import PropTypes from 'prop-types'

export default class InfiniteScroll extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: this.props.data,
      end: true
    }
    this.length = this.state.data.length
    this.data = [...this.props.data]
    this.skipCheck = false
    this.offset = 0
  }

  getDirection = (contentOffsetY, offset = 0) => {
    return contentOffsetY > offset ? 'down' : 'up'
  }

  checkScroll ({ layoutMeasurement, contentOffset, contentSize }) {
    console.log('before', this.state.data.length)
    // console.log('skip', this.skipCheck)
    if (!this.skipCheck) {
      // console.log({ layoutMeasurement, contentOffset, contentSize })
      let currentOffset = contentOffset.y
      let direction = this.getDirection(currentOffset, this.offset)
      // console.log('direction', direction)
      // console.log('contentOffset.y <= this.props.offset', contentOffset.y <= this.props.offset)
      this.offset = currentOffset
      if (contentOffset.y <= this.props.offset && direction === 'up') {
        console.log('here')
        this.skipCheck = true
        this.setState(prevState => ({
          data: [...this.data, ...this.data]
        }), () => {
          this.infListRef.scrollToIndex({ index: this.length, animated: false })
          this.skipCheck = false
          console.log('after', this.state.data.length)
        })
      } else {
        this.skipCheck = false
      }
    }
    // if (layoutMeasurement.height + contentOffset.y >= contentSize.height - this.props.offset && this.state.end) {
    //   this.setState(prevState => ({
    //     data: [...prevState.data, ...this.data],
    //     end: false
    //   }))
    // } else {
    //   this.setState({
    //     end: true
    //   })
    // }
  }

  // componentDidMount () {
  //   this.setState(prevState => ({
  //     data: [...prevState.data, ...prevState.data]
  //   }))
  //   setTimeout(() => { this.infListRef.scrollToIndex({ animated: false, index: this.length }) }, 500)
  // }

  onEndReached = (info) => {
    console.log('this.state.data.length', this.state.data.length)
    if (this.state.data.length > this.length * 2) {
      this.setState(prevState => {
        // firstPart = this.data.slice(0, Math.floor(this.length / 2))
        // console.log('firstPart', firstPart)
        // this.data = [...prevState.data, ...this.data]
        console.log('this.data > x2', this.data)
        return {
          data: prevState.data.slice(this.length * 2)
        }
      })// , () => this.infListRef.scrollToIndex({ index: this.length - 1, animated: false }))
    } else {
      this.setState(prevState => {
        // firstPart = this.data.slice(0, Math.floor(this.length / 2))
        // console.log('firstPart', firstPart)
        // this.data = [...prevState.data, ...this.data]
        console.log('this.data', this.data)
        return {
          data: [...prevState.data, ...this.data]
        }
      }) //, () => this.infListRef.scrollToIndex({ index: this.length - 1, animated: false }))
    }
  }

  render () {
    return (

      <FlatList
        {...this.props}
        data={this.state.data}
        ref={(ref) => { this.infListRef = ref }}
        renderItem={this.props.renderItem}
        showsVerticalScrollIndicator={this.props.showsVerticalScrollIndicator}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.1}
        onScroll={({ nativeEvent }) => this.checkScroll(nativeEvent)}
      />
    )
  }
}

InfiniteScroll.propTypes = {
  data: PropTypes.array,
  offset: PropTypes.number,
  renderItem: PropTypes.func,
  showsVerticalScrollIndicator: PropTypes.bool
}

InfiniteScroll.defaultProps = {
  offset: 20,
  showsVerticalScrollIndicator: false
}
